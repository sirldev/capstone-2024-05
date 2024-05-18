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

export default function HubItems({ templates }: { templates: any[] }) {
  const router = useRouter();

  const handleHubItemClick = (id: number) => {
    console.log(id);
    console.log('/detail?id=${id}');
    router.push(`/hub/${id}`);
  };

  // 이 객체를 통해 각 리소스 이름에 해당하는 색상을 빠르게 검색할 수 있습니다.
  const resourceColors: { [key: string]: string } = {};
  const tempHubItems = templates?.map((template) => {
    return {
      id: template.id,
      prompt: template.prompt,
      userName: 'AAA',
      hashtags: 'DynamoDB|S3',
    };
  });

  // 모든 그룹과 아이템을 순회하며 resourceColors 객체를 생성합니다.
  resources.forEach((group) => {
    group.items.forEach((item) => {
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
