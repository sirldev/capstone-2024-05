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
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconArrowRight, IconDownload } from '@tabler/icons-react';
import classes from './Result.module.css';

export default function Result() {
  const [value, setValue] = useState(TempJson);

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

  return (
    <Container className={classes.inner}>
      <Text size="xl" fw={500} mt="sm" mb={7}>
        사용자 입력
      </Text>
      <Text size="sm" c="dimmed" lh={1.6}>
        t2.micro 타입의 EC2 인스턴스를 2개 생성하고, 각 인스턴스에 10GB의 EBS
        볼륨을 연결하고 싶어요
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
        이 CloudFormation 템플릿에는 다음과 같은 요소가 있습니다: <br />
        <br />
        Mappings (매핑): 이 섹션은 지역(Region)과 해당 AMI(Amazon Machine Image)
        간의 매핑을 정의합니다. 예를 들어, us-east-1 지역의 AMI는
        "ami-0ff8a91507f77f867"입니다.
        <br />
        Parameters (매개변수): 이 부분은 "EnvType"이라는 환경 유형을 지정하는
        매개변수를 정의합니다. 기본값은 "test"이며, "prod", "dev", "test" 중
        하나를 선택해야 합니다.
        <br />
        Conditions (조건): "CreateProdResources"와 "CreateDevResources"라는 두
        가지 조건이 정의되어 있습니다. 이들은 "EnvType"에 따라 프로덕션 및 개발
        환경에 대한 여부를 결정합니다.
        <br />
        Resources (리소스):
        <br />
        EC2Instance: 이 리소스는 AWS EC2 인스턴스를 생성합니다.
        <br />
        이미지 ID는 해당 지역에 대한 매핑에서 가져오며, "EnvType"에 따라
        인스턴스 유형이 변경됩니다.
        <br />
        MountPoint: "CreateProdResources" 조건에 따라서만 생성되는 AWS EC2
        볼륨을 인스턴스에 첨부하는 볼륨 첨부 리소스입니다.
        <br />
        NewVolume: "CreateProdResources" 조건에 따라서만 생성되는 새로운 AWS EC2
        볼륨을 정의합니다. 크기는 100이며, 인스턴스의 가용 영역에 배치됩니다.
        <br />
        이 템플릿은 "EnvType"에 따라 프로덕션, 개발 또는 테스트 환경에 필요한
        AWS 리소스를 생성할 수 있습니다.
        <br />
      </Text>

      <Button
        mt={30}
        onClick={downloadJson}
        rightSection={<IconDownload size={14} />}
      >
        템플릿 파일 다운로드
      </Button>
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
