'use client';

import classes from './codespace.module.css';

import { Editor } from '@monaco-editor/react';
import {
  ActionIcon,
  Box,
  Button,
  CopyButton,
  Group,
  LoadingOverlay,
  Tooltip,
  rem,
  Container,
  Flex,
  Loader,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconCheck, IconCopy, IconX } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { NavigationProgress, nprogress } from '@mantine/nprogress';

const code = `{
  "AWSTemplateFormatVersion": "2010-09-09",
  "Description": "CloudFormation Template as part of the AWS Serverless Data Lake Immersion Day to create an S3 bucket and relevant IAM roles and IAM policies.",
  "Resources": {
    "SDLS3Bucket": {
      "Type" : "AWS::S3::Bucket",
      "Properties" : {
        "BucketName": {
          "Fn::Join": [
            "-", [
              "sdl-immersion-day",
              {
                "Ref": "AWS::AccountId"
              }
            ]
          ]
        },
        "PublicAccessBlockConfiguration": {
          "BlockPublicAcls": true,
          "BlockPublicPolicy": true,
          "IgnorePublicAcls": true,
          "RestrictPublicBuckets": true
        }
      }
    },
    "SDLGlueRole": {
      "Type": "AWS::IAM::Role",
      "Properties": {
        "RoleName": "SDL-GlueRole",
        "AssumeRolePolicyDocument": {
          "Version": "2012-10-17",
          "Statement": [
            {
              "Effect": "Allow",
              "Principal": {
                "Service": [
                  "glue.amazonaws.com"
                ]
              },
              "Action": [
                "sts:AssumeRole"
              ]
            }
          ]
        },
        "ManagedPolicyArns": [
          "arn:aws:iam::aws:policy/service-role/AWSGlueServiceRole"
        ]
      }
    },
    "SDLGlueInteractiveSessionsPolicy": {
      "Type": "AWS::IAM::Policy",
      "Properties": {
        "PolicyName": "AWSGlueInteractiveSessions",
        "PolicyDocument": {
          "Version": "2012-10-17",
          "Statement": [
            {
              "Effect": "Allow",
              "Action": "iam:PassRole",
              "Resource": {
                "Fn::GetAtt" : [ "SDLGlueRole", "Arn" ]
              },
              "Condition": {
                "StringLike": {
                  "iam:PassedToService": "glue.amazonaws.com"
                }
              }
            }
          ]
        },
        "Roles": [
          {
            "Ref": "SDLGlueRole"
          }
        ]
      }
    },
    "SDLGlueS3Policy": {
      "Type": "AWS::IAM::Policy",
      "Properties": {
        "PolicyName": "S3BucketPermissions",
        "PolicyDocument": {
          "Version": "2012-10-17",
          "Statement": [
            {
              "Effect": "Allow",
              "Action": [
                "s3:PutObject",
                "s3:GetObject",
                "s3:DeleteObject"
              ],
              "Resource": {
                "Fn::Join": [
                  "", [
                    {
                      "Fn::GetAtt" : [ "SDLS3Bucket", "Arn" ]
                    },
                    "/*"
                  ]
                ]
              }
            }
          ]
        },
        "Roles": [
          {
            "Ref": "SDLGlueRole"
          }, {
            "Ref": "SDLFirehoseRole"
          }
        ]
      }
    },
    "SDLFirehoseRole": {
      "Type": "AWS::IAM::Role",
      "Properties": {
        "RoleName": "SDL-FirehoseRole",
        "AssumeRolePolicyDocument": {
          "Version": "2012-10-17",
          "Statement": [
            {
              "Sid": "",
              "Effect": "Allow",
              "Principal": {
                "Service": "firehose.amazonaws.com"
              },
              "Action": "sts:AssumeRole",
              "Condition": {
                "StringEquals": {
                  "sts:ExternalId": {
                    "Ref": "AWS::AccountId"
                  }
                }
              }
            }
          ]
        },
        "ManagedPolicyArns": [
          "arn:aws:iam::aws:policy/CloudWatchLogsFullAccess"
        ]
      }
    }
  }
}
`;

export default function CodeSpaceEditor() {
  const [visible, { toggle }] = useDisclosure(false);

  const [loading, setLoading] = useState(true);
  const [valid, setValid] = useState(false);

  useEffect(() => {
    if (loading) {
      nprogress.start();
    } else {
      nprogress.complete();
    }
  }, [loading]);

  return (
    <div className={classes.wrapper}>
      <Container size={700} className={classes.inner}>
        <Box pos="relative" p={8} className={classes['code-wrapper']}>
          <Flex justify="space-between" align="center">
            <CopyButton value="https://mantine.dev" timeout={2000}>
              {({ copied, copy }) => (
                <Tooltip
                  label={copied ? 'Copied' : 'Copy'}
                  withArrow
                  position="right"
                >
                  <ActionIcon
                    color={copied ? 'teal' : 'gray'}
                    variant="subtle"
                    onClick={copy}
                  >
                    {copied ? (
                      <IconCheck style={{ width: rem(16) }} />
                    ) : (
                      <IconCopy style={{ width: rem(16) }} />
                    )}
                  </ActionIcon>
                </Tooltip>
              )}
            </CopyButton>
            <Tooltip
              label={
                loading
                  ? '올바른 템플릿 형식인지 확인중입니다.'
                  : valid
                    ? '올바른 템플릿 형식입니다.'
                    : '올바르지 않은 템플릿 형식입니다.'
              }
              withArrow
              position="bottom-end"
            >
              <ActionIcon variant="subtle" color="gray">
                {loading ? (
                  <Loader size="xs" />
                ) : valid ? (
                  <IconCheck style={{ width: rem(16) }} color="green" />
                ) : (
                  <IconX style={{ width: rem(16) }} color="red" />
                )}
              </ActionIcon>
            </Tooltip>
          </Flex>
          <Box pos={'relative'} mt={4}>
            <LoadingOverlay
              visible={visible}
              zIndex={1000}
              overlayProps={{ radius: 'sm', blur: 2 }}
            />
            <Editor
              height="400px"
              defaultLanguage="json"
              defaultValue={code}
              options={{
                fontSize: '14px',
                minimap: {
                  enabled: false,
                },
                automaticLayout: true,
              }}
              // theme="vs-dark"
            />
          </Box>

          <Group justify="center" mt={8}>
            <Button onClick={toggle}>Toggle overlay</Button>
            <Button onClick={() => setLoading(!loading)}>Toggle Loading</Button>
            <Button onClick={() => setValid(!valid)}>Check valid</Button>
          </Group>
        </Box>
      </Container>
    </div>
  );
}
