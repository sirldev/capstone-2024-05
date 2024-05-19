'use client';

import {
  Container,
  TagsInput,
  Badge,
  Title,
  LoadingOverlay,
  UnstyledButton,
  Textarea,
  Text,
  Button,
  Group,
  AppShell,
  Burger,
  Grid,
  SimpleGrid,
  Paper,
} from '@mantine/core';
import {} from '@tabler/icons-react';
import Link from 'next/link';
// import { GithubIcon } from '@mantinex/dev-icons';
import classes from './TemplateHub.module.css';
import { IconSearch } from '@tabler/icons-react';

import React, { useState } from 'react';
import HubItems from './HubItems';

interface IHub {
  templates: any[];
}

export default function TemplateHub({ templates }: IHub) {
  const [value, setValue] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [filteredTemplates, setFilteredTemplates] = useState<any[]>([]);

  const filterTemplates = () => {
    const results = templates.filter((template) =>
      searchResults.every((tag) => template.hashtag.includes(tag)),
    );
    setFilteredTemplates(results);
  };

  const handleIconClick = () => {
    if (value.length > 0) {
      setShowResults(true);
    } else {
      setShowResults(false);
    }
    setSearchResults(value);
    filterTemplates();
  };

  const iconElement = (
    <div
      style={{
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '8px',
      }}
      onClick={handleIconClick}
    >
      <IconSearch size={18} />
    </div>
  );

  const allItems = resources.flatMap((group) => group.items);

  // const handleTagsChange = (newTags : any) => {
  //   setTags(newTags);  // 새로운 태그 배열을 상태에 저장
  // };

  const handleTagInput = (tags: string[]) => {
    // 입력된 태그들을 필터링하여 allItems 배열에 있는 태그만 남김
    const validTags = tags.filter((tag) => allItems.includes(tag));
    setValue(validTags);
  };

  const resourceColors: { [key: string]: string } = {};

  // 모든 그룹과 아이템을 순회하며 resourceColors 객체를 생성합니다.
  resources.forEach((group) => {
    group.items.forEach((item) => {
      resourceColors[item] = group.color;
    });
  });

  return (
    <div className={classes.wrapper}>
      <Container size="xl" className={classes.inner}>
        <Container size="sm">
          <TagsInput
            size="md"
            value={value}
            onChange={handleTagInput}
            placeholder={
              value.length > 0 ? '' : '필요한 리소스를 태그로 검색해보세요.'
            }
            rightSection={iconElement}
            splitChars={[',', ' ', '|']}
            data={resources}
            clearable
          />
        </Container>
        <Container mt={80} size={'xl'}>
          {showResults ? (
            <>
              <div className={classes.badges}>
                {searchResults.map((item: string, index: any) => {
                  return (
                    <Badge
                      key={index}
                      variant="light"
                      color={resourceColors[item]}
                    >
                      {item}
                    </Badge>
                  );
                })}
                <Text>검색 결과</Text>
              </div>

              <HubItems templates={filteredTemplates} />
            </>
          ) : (
            <>
              <Text>​</Text>
              <HubItems templates={templates} />
            </>
          )}
        </Container>
      </Container>
    </div>
  );
}

export const resources = [
  {
    group: 'Compute',
    color: 'red',
    items: ['EC2', 'Lambda', 'Batch', 'ECS', 'EKS', 'Fargate'],
  },
  {
    group: 'Storage',
    color: 'pink',
    items: ['S3', 'EBS', 'Elastic File System', 'Storage Gateway', 'FSx'],
  },
  {
    group: 'Database',
    color: 'grape',
    items: [
      'RDS',
      'DynamoDB',
      'ElastiCache',
      'Redshift',
      'Aurora',
      'Database Migration Service',
    ],
  },
  {
    group: 'Networking and Content Delivery',
    color: 'violet',
    items: ['VPC', 'Route 53', 'Direct Connect', 'CloudFront'],
  },
  {
    group: 'Developer Tools',
    color: 'indigo',
    items: ['CodeCommit', 'CodeBuild', 'CodeDeploy', 'CodePipeline'],
  },
  {
    group: 'Management and Governance',
    color: 'yellow',
    items: [
      'CloudFormation',
      'CloudWatch',
      'Auto Scaling',
      'CloudTrail',
      'Config',
    ],
  },
  {
    group: 'Security, Identity, and Compliance',
    color: 'cyan',
    items: [
      'Identity and Access Management',
      'GuardDuty',
      'Key Management Service',
      'Shield',
      'WAF',
    ],
  },
  {
    group: 'Machine Learning',
    color: 'green',
    items: ['SageMaker', 'Comprehend', 'Rekognition', 'DeepLens'],
  },
  {
    group: 'Analytics',
    color: 'blue',
    items: ['Athena', 'EMR', 'Glue', 'QuickSight', 'Lake Formation'],
  },
  {
    group: 'Application Integration',
    color: 'lime',
    items: ['Step Functions', 'SQS', 'SNS', 'AppSync'],
  },
  {
    group: 'Customer Engagement',
    color: 'teal',
    items: ['Connect', 'Simple Email Service', 'Pinpoint'],
  },
];
