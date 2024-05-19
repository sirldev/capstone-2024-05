'use client';
import React, { useState } from 'react';
import {
  Container,
  JsonInput,
  Textarea,
  Text,
  Tooltip,
  Button,
  Group,
  AppShell,
  Burger,
  Grid,
  SimpleGrid,
  Paper,
  Modal,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconArrowRight, IconDownload, IconUpload } from '@tabler/icons-react';
import classes from './Result.module.css';
import { Editor } from '@monaco-editor/react';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';

interface IResult {
  prompt: string;
  template: string;
  description: string;
  hasUploaded: boolean;
  id: number;
}

export default function Result({ template }: any) {
  const { isLoggedIn, accessToken } = useAuth();
  const [isUploaded, setIsUploaded] = useState(template.uploaded !== null);
  const [isModalOpen, { open, close }] = useDisclosure(false);

  const [value, setValue] = useState(
    JSON.stringify(template.template, null, 2),
  );

  const downloadJson = () => {
    const blob = new Blob([value], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'data.json'; // 다운로드할 파일 이름
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url); // 생성된 URL을 메모리에서 해제
  };

  const uploadTemplate = () => {
    setIsUploaded(true);
    const config: { headers: { Authorization?: string }; timeout?: number } = {
      headers: {},
    };

    config.timeout = 60000;
    if (isLoggedIn) {
      config.headers['Authorization'] = `${accessToken}`;
    }

    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/templates/upload`,
        {
          id: template.id,
        },
        config,
      )
      .then((res) => {
        // console.log(res);
        open();
      })
      .catch((error) => {
        setIsUploaded(false);
        console.log(error);
      });
  };

  return (
    <Container className={classes.inner}>
      <Text size="xl" fw={500} mt="sm" mb={7}>
        사용자 입력
      </Text>
      <Text size="sm" c="dimmed" lh={1.6}>
        {template.prompt}
      </Text>

      <Text size="xl" fw={500} mt="sm">
        결과
      </Text>

      <JsonInput
        mt={7}
        value={value}
        onChange={setValue}
        placeholder="json field"
        validationError="Invalid JSON"
        formatOnBlur
        autosize
        minRows={4}
      />

      <Text size="xl" fw={500} mt="lg">
        설명
      </Text>

      <Text size="md" fw={300} mt="lg">
        {template.description}
      </Text>

      <Button
        mt={30}
        onClick={downloadJson}
        rightSection={<IconDownload size={14} />}
      >
        템플릿 파일 다운로드
      </Button>

      {isLoggedIn && template.uploaded === null ? (
        <Button
          mt={30}
          ml={10}
          onClick={uploadTemplate}
          disabled={isUploaded}
          bg="cyan"
          rightSection={<IconUpload size={14} />}
        >
          템플릿 업로드
        </Button>
      ) : (
        <></>
      )}

      <Modal opened={isModalOpen} onClose={close} title="템플릿 업로드 성공">
        Template Hub와 My Page에서 확인해 보세요.
      </Modal>
    </Container>
  );
}
