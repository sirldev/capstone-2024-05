'use client';

import { Container, Textarea, Text, Title, Button, Group, AppShell, Burger, Grid, SimpleGrid, Paper } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconGauge,
  IconCookie,
  IconUser,
  IconMessage2,
  IconLock,
  IconArrowRight
} from '@tabler/icons-react';
import Link from 'next/link';
// import { GithubIcon } from '@mantinex/dev-icons';
import classes from './references.module.css';
import FeaturesGrid from '../../FeatureGrid';
import CloudFormationDescription from '../../CloudFormationDescription';
import Usage from '../../Usage';
import Header from '../../Header';

export default function References() {
  const [opened, { toggle }] = useDisclosure(false);
  const handleClick = () => {
    console.log("버튼이 클릭되었습니다!");
  };

  return (
    <div>
      <Title className={classes.title}>
                참고 문서
            </Title>
      <SimpleGrid
          mt={10}
          cols={{ base: 1, sm: 1, md: 2 }}
          spacing={{ base: 'xs', md: 20 }}
          verticalSpacing={{ base: 'xl', md: 20 }}
      >
          <Paper shadow="md" p="md">
          <Text fw={700} size="sm">설명 어쩌구</Text>
          <Text mt={5} c="gray" size="xs">Auto scaling을 지원하는 RDS Aurora 클러스터를 만들어줘. 인스턴스 타입은 db.r5.large로 해줘.</Text>
          </Paper>

          <Paper shadow="md" p="md">
          <Text fw={700} size="sm">설명 어쩌구</Text>
          <Text mt={5} c="gray" size="xs">키 이름이 testkey인 EC2 인스턴스를 생성해줘. 추가로 20GB 크기의 io1 볼륨을 갖는 블록 디바이스 매핑을 포함시켜줘.</Text>
          </Paper>

          <Paper shadow="md" p="md">
          <Text fw={700} size="sm">설명 어쩌구</Text>
          <Text mt={5} c="gray" size="xs">#네트워킹”, “#보안”, “#스토리지” “#데이터베이스”, “EC2” 와 같은 해시태그를 사용할 수 있습니다.</Text>
          </Paper>

          <Paper shadow="md" p="md">
          <Text fw={700} size="sm">설명 어쩌구</Text>
          <Text mt={5} c="gray" size="xs">#네트워킹”, “#보안”, “#스토리지” “#데이터베이스”, “EC2” 와 같은 해시태그를 사용할 수 있습니다.</Text>
          </Paper>
      </SimpleGrid>
    </div>
  );
}
