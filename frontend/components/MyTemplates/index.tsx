'use client';

import {
  Container,
  TagsInput,
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
import classes from './MyTemplates.module.css';
import { IconSearch } from '@tabler/icons-react';

import React, { useState } from 'react';
import { resources } from '../TemplateHub';
import MyItems from './MyItem';

interface IHub {
  templates: any[];
}

export default function MyTemplates({ templates }: IHub) {
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

  const uploadedTemplates = templates.filter(template => template.uploaded !== null);
  const notUploadedTemplates = templates.filter(template => template.uploaded === null);

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

  const handleTagInput = (tags: string[]) => {
    // 입력된 태그들을 필터링하여 allItems 배열에 있는 태그만 남김
    const validTags = tags.filter((tag) => allItems.includes(tag));
    setValue(validTags);
  };

  return (
    <div className={classes.wrapper}>
      <Container size="xl" className={classes.inner}>
        <Title className={classes.title} mt={0}>
          내가 생성한 템플릿 확인하기
        </Title>
        
        {templates.length == 0 ? (
          <div></div>
        ) : (
          <div>
            <Text mt="xl">
              업로드한 템플릿
            </Text>
            <MyItems templates={uploadedTemplates} isUploaded={true}/>
            <Text mt="xl">
              생성한 템플릿
            </Text>
            <MyItems templates={notUploadedTemplates} isUploaded={false}/>
          </div>
        )}
      </Container>
    </div>
  );
}