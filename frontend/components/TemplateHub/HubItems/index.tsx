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
  Flex,
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

  // 모든 그룹과 아이템을 순회하며 resourceColors 객체를 생성합니다.
  resources.forEach((group) => {
    group.items.forEach((item) => {
      resourceColors[item] = group.color;
    });
  });

  const tempHubItems = templates?.map((template) => {
    return {
      id: template.id,
      prompt: template.prompt,
      userName: template.username,
      hashtags: template.hashtag || [],
      created: template.created,
    };
  });

  const removePrefix = (item: string) => {
    const prefixes = ['AWS', 'Amazon'];
    for (const prefix of prefixes) {
      if (item.startsWith(prefix + ' ')) {
        return item.substring(prefix.length + 1);
      }
    }
    return item;
  };

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
        {item.hashtags.map((item: string, index: any) => {
          const displayItem = removePrefix(item);
          return (
            <Badge
              key={index}
              variant="light"
              color={resourceColors[displayItem]}
            >
              {displayItem}
            </Badge>
          );
        })}
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

  if (templates.length === 0) {
    return (
      <Flex mt={20} justify="center" align="center" direction="column">
        <Text>해당 리소스를 사용하는 템플릿 파일이 없어요.</Text>
        <Button mt={12} onClick={() => router.push('/generator')}>
          템플릿 만들러가기
        </Button>
      </Flex>
    );
  }

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
