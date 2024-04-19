'use client';
import React, { useState } from 'react';
import { Container, JsonInput, Textarea, Text, Tooltip, Button, Group, AppShell, Burger, Grid, SimpleGrid, Paper } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconArrowRight
} from '@tabler/icons-react';
import classes from './Result.module.css';

export default function Result() {
    const [value, setValue] = useState(TempJson);

    const [text, setText] = useState('');
    const isDisabled = text.length < 10;

  return (
        <Container  className={classes.inner}>

            <Text mt="sm" mb={7}>
                사용자 입력
            </Text>
            <Text size="sm" c="dimmed" lh={1.6}>
                여러분이 원하는 템플릿의 기능과 구성 요소에 대해 가능한 한 구체적으로 설명해 주세요. {<br/>}예를 들어, "EC2 인스턴스를 생성하고 싶어요" 보다는 "t2.micro 타입의 EC2 인스턴스를 2개 생성하고, 각 인스턴스에 10GB의 EBS 볼륨을 연결하고 싶어요"가 더 도움이 됩니다.
            </Text>

            <Text mt="sm" mb={7}>
                결과
            </Text>

            <JsonInput
                value={value}
                onChange={setValue}
                placeholder="json field"
                validationError="Invalid JSON"
                formatOnBlur
                autosize
                minRows={4}
                />

        </Container>    
  );
}


export const TempJson = `{
  "AWSTemplateFormatVersion": "2010-09-09",
  "Description": "Simple AWS CloudFormation Template for an EC2 instance.",
  "Resources": {
    "MyEC2Instance": {
      "Type": "AWS::EC2::Instance",
      "Properties": {
        "InstanceType": "t2.micro",
        "ImageId": "ami-0abcdef1234567890",
        "KeyName": "MyKeyPair",
        "SecurityGroups": [
          "default"
        ]
      }
    }
  }
}`;
