'use client';

import { Container, TagsInput, Title, LoadingOverlay, UnstyledButton, Textarea, Text, Button, Group, AppShell, Burger, Grid, SimpleGrid, Paper } from '@mantine/core';
import {} from '@tabler/icons-react';
import Link from 'next/link';
// import { GithubIcon } from '@mantinex/dev-icons';
import classes from './TemplateHub.module.css';
import { IconSearch } from '@tabler/icons-react';

import React,{ useState } from 'react';
import HubItems from './HubItems';

export default function TemplateHub() {
  const [value, setValue] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [searchResults, setSearchResults] = useState<string[]>([]); 
  const handleIconClick = () => {
    if (value.length > 0) {
      setShowResults(true);
    } else {
      setShowResults(false);
    }
    setSearchResults(value);
  };

  const iconElement = (
    <div
      style={{
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '8px' 
      }}
      onClick={handleIconClick}
    >
      <IconSearch size={18} />
    </div>
  );

  const resources = [
    { group: 'Compute', items: ['Amazon EC2', 'AWS Lambda', 'Amazon Lightsail', 'AWS Batch', 'Amazon ECS', 'Amazon EKS', 'AWS Fargate'] },
    { group: 'Storage', items: ['Amazon S3', 'Amazon EBS', 'Amazon Elastic File System', 'AWS Storage Gateway', 'Amazon FSx'] },
    { group: 'Database', items: ['Amazon RDS', 'Amazon DynamoDB', 'Amazon ElastiCache', 'Amazon Redshift', 'Amazon Aurora', 'AWS Database Migration Service'] },
    { group: 'Networking and Content Delivery', items: ['Amazon VPC', 'Amazon Route 53', 'AWS Direct Connect', 'Amazon CloudFront'] },
    { group: 'Developer Tools', items: ['AWS CodeCommit', 'AWS CodeBuild', 'AWS CodeDeploy', 'AWS CodePipeline', 'AWS Cloud9'] },
    { group: 'Management and Governance', items: ['AWS CloudFormation', 'Amazon CloudWatch', 'AWS Auto Scaling', 'AWS CloudTrail', 'AWS Config'] },
    { group: 'Security, Identity, and Compliance', items: ['AWS Identity and Access Management', 'Amazon GuardDuty', 'AWS Key Management Service', 'AWS Shield', 'AWS WAF'] },
    { group: 'Machine Learning', items: ['Amazon SageMaker', 'AWS DeepRacer', 'Amazon Comprehend', 'Amazon Rekognition', 'AWS DeepLens'] },
    { group: 'Analytics', items: ['Amazon Athena', 'Amazon EMR', 'AWS Glue', 'Amazon QuickSight', 'AWS Lake Formation'] },
    { group: 'Application Integration', items: ['AWS Step Functions', 'Amazon SQS', 'Amazon SNS', 'AWS AppSync'] },
    { group: 'Customer Engagement', items: ['Amazon Connect', 'Amazon Simple Email Service', 'Amazon Pinpoint'] }
];

const allItems = resources.flatMap(group => group.items);
  

  // const handleTagsChange = (newTags : any) => {
  //   setTags(newTags);  // 새로운 태그 배열을 상태에 저장
  // };

  const handleTagInput = (tags : string[]) => {
    // 입력된 태그들을 필터링하여 allItems 배열에 있는 태그만 남김
    const validTags = tags.filter(tag => allItems.includes(tag));
    setValue(validTags);
  };

  return (
    <div className={classes.wrapper}>
          <Container size="xl" className={classes.inner}>
            <Container size="sm">
              <TagsInput 
                size='md'
                value={value} 
                onChange={handleTagInput}
                placeholder={value.length > 0 ? "" : "필요한 리소스를 태그로 검색해보세요."}
                rightSection={iconElement}
                splitChars={[',', ' ', '|']}
                data={resources}
                clearable
              />

            </Container>
            <Container
              mt={80}
              size={'xl'}
              >
              {showResults && 
                <div>
                  <h2>{searchResults.join(', ')} 검색 결과</h2>
                </div>
              }
              <HubItems />
            </Container>
          </Container>
    </div>
  );
}
