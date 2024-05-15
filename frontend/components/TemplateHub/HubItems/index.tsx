'use client';

import {
  Container,
  Card,
  Title,
  Badge,
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
import classes from './HubItems.module.css';
import { IconSearch } from '@tabler/icons-react';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { resources } from '..';

export default function HubItems() {
  const router = useRouter();

  const handleHubItemClick = (id: number) => {
    console.log(id);
    console.log('/detail?id=${id}');
    router.push(`/hub/${id}`);
  };

    // 이 객체를 통해 각 리소스 이름에 해당하는 색상을 빠르게 검색할 수 있습니다.
    const resourceColors: { [key: string]: string } = {};

    // 모든 그룹과 아이템을 순회하며 resourceColors 객체를 생성합니다.
    resources.forEach(group => {
      group.items.forEach(item => {
        resourceColors[item] = group.color;
      });
    });

  // const items = tempHubItems.map((item) => (
  //   <UnstyledButton key={item.id} className={classes.item}>
  //     <Text size="xs" mt={7}>
  //       {item.prompt}
  //     </Text>
  //   </UnstyledButton>
  // ));

  const features = tempHubItems.map((item) => (
    <Card
      key={item.id}
      shadow="xs"
      radius="md"
      className={classes.card}
      padding="lg"
      onClick={() => handleHubItemClick(item.id)}
    >
      <div className={classes.badges}>
        {item.hashtags.split('|').map((item, index) => (
          // 각 아이템에 대해 Badge 컴포넌트 생성
          <Badge key={index} variant="light" color={resourceColors[item]}>
            {item}
          </Badge>
        ))}
      </div>
      <Text fz="xs" c="dimmed" fw={500} className={classes.cardTitle} mt="sm">
        사용자 입력
      </Text>
      <Text fz="sm" mt="0">
        {item.prompt}
      </Text>
      <Text fz="xs" className={classes.userName}>
        {item.userName}
      </Text>
    </Card>
  ));

  return (
    <SimpleGrid
      mt={20}
      cols={{ base: 1, xs: 2, md: 3, xl: 4 }}
      spacing={{ base: 10, sm: 'xl' }}
      verticalSpacing={{ base: 'md', sm: 'xl' }}
    >
      {features}
    </SimpleGrid>
  );
}

export const tempHubItems = [
  {
    id: 11,
    prompt: 'Amazon S3에 새로운 버킷 만들어줘. 데이터 로깅도 활성화시켜줘.',
    userName: 'Ivy',
    hashtags: 'S3|Logging',
  },
  {
    id: 12,
    prompt:
      "DynamoDB에 새로운 테이블을 만들어. 테이블 이름은 'UserProfiles'이고, 주 키는 'ProfileID'야.",
    userName: 'Charlie',
    hashtags: 'DynamoDB|S3',
  },
  {
    id: 13,
    prompt:
      "IAM 유저 하나 추가해줘. 이름은 'newuser'이고, 관리형 정책으로 'AmazonEC2ReadOnlyAccess' 붙여줘.",
    userName: 'Alice',
    hashtags: 'IAM|EC2',
  },
  {
    id: 14,
    prompt:
      "t3.small 인스턴스로 웹 서버 하나 올려줘. AMI는 'ami-0abcdef1234567890' 사용해. 자동 복구 설정도 해줘.",
    userName: 'Bob',
    hashtags: 'EC2|AMI',
  },
  {
    id: 15,
    prompt:
      'API Gateway와 연결된 Lambda 함수 만들어줘. Node.js 사용하고, 트리거는 HTTP 요청으로 설정해줘.',
    userName: 'Eve',
    hashtags: 'API Gateway|Lambda',
  },
  {
    id: 16,
    prompt: 'EBS 볼륨 하나 만들어줘. 50GB gp3 타입이고, 암호화도 활성화해줘.',
    userName: 'Frank',
    hashtags: 'EBS|Security',
  },
  {
    id: 17,
    prompt:
      'Auto Scaling 그룹 설정할건데, 원하는 CPU 사용량이 75%가 넘어가면 인스턴스 하나 더 추가해줘.',
    userName: 'Grace',
    hashtags: 'Auto Scaling|EC2',
  },
  {
    id: 18,
    prompt:
      "Route 53으로 새 도메인 등록해줘. 도메인 이름은 'example.com'이야.",
    userName: 'Hank',
    hashtags: 'Route 53|DNS',
  },
  {
    id: 19,
    prompt:
      'CloudWatch에서 CPU 사용량 모니터링하는 알람 만들어줘. 80% 넘어가면 알람 울리게 해줘.',
    userName: 'Ivy',
    hashtags: 'CloudWatch|Monitoring',
  },
  {
    id: 20,
    prompt:
      'Elastic Load Balancer 만들어서 두 개 EC2 인스턴스에 연결해줘. 인스턴스는 이미 실행 중이야.',
    userName: 'Jack',
    hashtags: 'ELB|EC2',
  },
  {
    id: 21,
    prompt:
      'RDS로 PostgreSQL 데이터베이스 하나 생성해줘. 멀티 AZ 활성화시켜서 데이터 안전하게 보관해줘.',
    userName: 'Ivy',
    hashtags: 'RDS|PostgreSQL',
  },
  {
    id: 22,
    prompt:
      'ElastiCache 클러스터를 Redis로 설정해줘. 캐시 노드 3개로 구성해줘.',
    userName: 'Hank',
    hashtags: 'ElastiCache|Redis',
  },
  {
    id: 23,
    prompt:
      "Simple Notification Service로 새로운 토픽 만들어줘. 토픽 이름은 'MyTopic'이야.",
    userName: 'Grace',
    hashtags: 'SNS',
  },
  {
    id: 24,
    prompt:
      'CloudFront를 통해 콘텐츠 전송 네트워크 구축해줘. S3 버킷을 원본으로 설정하고, SSL 인증서도 연결해줘.',
    userName: 'Charlie',
    hashtags: 'CloudFront|S3',
  },
  {
    id: 25,
    prompt:
      "KMS를 사용해서 새로운 키 생성해줘. 사용 목적은 '데이터 암호화'로 설정해.",
    userName: 'Diana',
    hashtags: 'KMS|Security',
  },
  {
    id: 26,
    prompt:
      "Fargate를 사용하여 컨테이너화된 애플리케이션 배포해줘. Docker 이미지는 'myimage:latest'로 설정해.",
    userName: 'Bob',
    hashtags: 'Fargate|Docker',
  },
  {
    id: 27,
    prompt:
      'SageMaker로 새로운 머신 러닝 모델 훈련시켜줘. 입력 데이터는 S3 버킷에서 가져와.',
    userName: 'Alice',
    hashtags: 'SageMaker|S3',
  },
  {
    id: 28,
    prompt:
      'FSx로 새 파일 시스템 만들어줘. Windows 호환성 필요하고, 저장 용량은 1TB로 해줘.',
    userName: 'Eve',
    hashtags: 'FSx|Windows Compatibility',
  },
  {
    id: 29,
    prompt: "VPC 내에 새로운 서브넷 만들어줘. CIDR은 '10.0.2.0/24'로 설정해.",
    userName: 'Frank',
    hashtags: 'VPC|Subnet',
  },
  {
    id: 30,
    prompt:
      'Direct Connect로 온프레미스 네트워크와 간 직접 연결 설정해줘.',
    userName: 'Grace',
    hashtags: 'Direct Connect',
  },
  {
    id: 1,
    prompt:
      'AMI ID가 ami-00112233이고, 키 이름이 myKeyPair인 EC2 인스턴스를 생성해주세요. 추가로 10GB 크기의 gp2 볼륨을 갖는 블록 디바이스 매핑을 포함시켜주세요.',
    userName: 'Alice',
    hashtags: 'Database Migration Service|Redshift|FSx',
  },
  {
    id: 2,
    prompt:
      't2.medium 인스턴스 유형으로 VPC vpc-77aabb11에서 실행되는 EC2 인스턴스를 생성해주세요. 보안 그룹 sg-01234abc를 사용해주세요.',
    userName: 'Jack',
    hashtags: 'DynamoDB|Lambda',
  },
  {
    id: 3,
    prompt:
      'RDS 인스턴스를 생성해주세요. 엔진은 MySQL, 크기는 20GB, 멀티 AZ는 활성화해주세요.',
    userName: 'Eve',
    hashtags: 'EC2|FSx|DynamoDB|CloudFront',
  },
  {
    id: 4,
    prompt:
      'S3 버킷을 생성하고, 객체 버전 관리와 서버 액세스 로깅을 활성화해주세요.',
    userName: 'Alice',
    hashtags:
      'Elastic File System|VPC|Redshift|CloudFront|Aurora',
  },
  {
    id: 5,
    prompt:
      'Lambda 함수를 생성해주세요. Python 3.8을 사용하며, IAM 역할은 lambda-basic-execution을 할당해주세요.',
    userName: 'Hank',
    hashtags:
      'Aurora|ECS|DynamoDB|Elastic File System',
  },
  {
    id: 6,
    prompt:
      'Auto Scaling 그룹을 생성해주세요. 최소 2개, 최대 5개의 EC2 인스턴스를 유지하며, 필요에 따라 자동으로 조정해주세요.',
    userName: 'Eve',
    hashtags: 'VPC|Aurora|EC2|Lightsail',
  },
  {
    id: 7,
    prompt:
      'ElastiCache Redis 클러스터를 생성해주세요. 노드 타입은 cache.t2.micro를 사용하며, 3개 노드로 구성해주세요.',
    userName: 'Alice',
    hashtags: 'VPC|EKS',
  },
  {
    id: 8,
    prompt:
      'CloudFront 배포를 생성해주세요. 원본은 새로 생성할 S3 버킷이며, HTTPS를 통한 접근만 허용해주세요.',
    userName: 'Ivy',
    hashtags: 'Database Migration Service|Elastic File System',
  },
  {
    id: 9,
    prompt:
      "DynamoDB 테이블을 생성해주세요. 테이블 이름은 'UserData'이며, 주 키는 'UserId'입니다.",
    userName: 'Bob',
    hashtags: 'EC2|Storage Gateway|Batch|Route 53',
  },
  {
    id: 10,
    prompt:
      'Route 53 호스팅 영역을 생성하고, mydomain.com을 위한 DNS 레코드를 설정해주세요.',
    userName: 'Jack',
    hashtags: 'EKS|Fargate|Storage Gateway|Lambda',
  },
];
