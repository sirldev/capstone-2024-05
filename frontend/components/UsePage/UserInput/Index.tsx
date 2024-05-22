'use client';
import React, { useState } from 'react';
import {
  Container,
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
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconArrowRight } from '@tabler/icons-react';
import classes from './userinput.module.css';

interface UserInputProps {
  text: string;
  setText: (text: string) => void;
  onButtonClick: () => void; // 여기서 onButtonClick은 매개변수가 없고 반환 값도 없는 함수입니다.
}

export default function UserInput({
  text,
  setText,
  onButtonClick,
}: UserInputProps) {
  // const [text, setText] = useState('');
  const isDisabled = text.length < 10;

  return (
    <Container className={classes.inner}>
      <Text mt="sm" mb={7}>
        구체적이고 명확하게 입력해 주세요
      </Text>
      <Text size="sm" c="dimmed" lh={1.6}>
        여러분이 원하는 템플릿의 기능과 구성 요소에 대해 가능한 한 구체적으로
        설명해 주세요.
        <br />
        예를 들어, &quot;EC2 인스턴스를 생성하고 싶어요&quot; 보다는
        &quot;t2.micro 타입의 EC2 인스턴스를 2개 생성하고, 각 인스턴스에 10GB의
        EBS 볼륨을 연결하고 싶어요&quot;가 더 도움이 됩니다.
      </Text>

      <Text mt="sm" mb={7}>
        주의사항을 확인해주세요
      </Text>
      <Text size="sm" c="dimmed" lh={1.6}>
        프로젝트에 적용되어야 하는 특정 제약사항이나 필요 조건이 있다면, 이를
        분명히 명시해 주세요.
        <br />
        예를 들어, 특정 지역에서만 리소스를 생성해야 하거나, 비용 제한이 있는
        경우 등입니다.
      </Text>

      <Textarea
        mt={30}
        placeholder="필요한 리소스를 설명해 주세요."
        autosize
        minRows={3}
        maxRows={10}
        value={text}
        onChange={(event) => setText(event.target.value)}
        // rightSection={icon}
      />

      {isDisabled ? (
        <Tooltip.Floating
          position="top"
          // offset={{ mainAxis: 9, crossAxis: -250 }}
          label="필요한 리소스에 대해 충분히 설명해 주세요."
        >
          <div>
            <Button
              disabled
              onClick={(event) => event.preventDefault()}
              mt={10}
            >
              템플릿 생성하기
            </Button>
          </div>
        </Tooltip.Floating>
      ) : (
        <Button
          mt={10}
          variant="gradient"
          gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
          onClick={onButtonClick}
        >
          템플릿 생성하기
        </Button>
      )}
    </Container>
  );
}
