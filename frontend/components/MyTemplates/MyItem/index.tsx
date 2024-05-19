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
import classes from './MyItems.module.css';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { resources } from '../../TemplateHub';

const formatDate = (dateString:string) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear()).slice(-2);
  return `${year}.${month}.${day}`;
};

interface IResult {
  templates: any[];
  isUploaded: boolean
}

export default function MyItems({templates, isUploaded} : IResult) {
  const router = useRouter();

  const handleHubItemClick = (id: number) => {
    console.log(templates);
    console.log(id);
    console.log('/detail?id=${id}');
    if (isUploaded) {
      router.push(`/hub/${id}`);
    }
  };

  const resourceColors: { [key: string]: string } = {};
  const tempHubItems = templates?.map((template) => {
    
    return {
      id: template.id,
      prompt: template.prompt,
      userName: template.username,
      hashtags: template.hashtag || [],
      created: template.created
    };
  });

  resources.forEach((group) => {
    group.items.forEach((item) => {
      resourceColors[item] = group.color;
    });
  });

  const removePrefix = (item:string) => {
    const prefixes = ["AWS", "Amazon"];
    for (const prefix of prefixes) {
      if (item.startsWith(prefix + " ")) {
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
          // console.log(displayItem);
          return (
                // 각 아이템에 대해 Badge 컴포넌트 생성
              <Badge key={index} variant="light" color={resourceColors[displayItem]}>
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
        {formatDate(item.created)}
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
