'use client'
import {
    ThemeIcon,
    Text,
    Title,
    Container,
    Textarea,
    SimpleGrid,
    rem,
    List,
    Button,
    Paper
  } from '@mantine/core';
  import {
    IconGauge,
    IconCookie,
    IconUser,
    IconMessage2,
    IconLock,
    IconArrowRight
  } from '@tabler/icons-react';
  import classes from './usage.module.css';
import { useRouter } from 'next/navigation';
  
  interface FeatureProps {
    icon: React.FC<any>;
    title: React.ReactNode;
    description: React.ReactNode;
  }
  
  export function Feature({ icon: Icon, title, description }: FeatureProps) {
    return (
      <div>
        <Text mt="sm" mb={7}>
          {title}
        </Text>
        <Text size="sm" c="dimmed" lh={1.6}>
          {description}
        </Text>
      </div>
    );
  }
  
  export default function Usage() {
    const router = useRouter()
  
    const icon = <IconArrowRight size={14} color='Black' />;

    return (
      <Container className={classes.wrapper}>  

      <SimpleGrid
        mt={30}
        cols={{ base: 1, sm: 2, md: 2 }}
        spacing={{ base: 'xs', md: 20 }}
        verticalSpacing={{ base: 'xl', md: 20 }}
      >
        <Paper shadow="md" p="md">
          <Text fw={700} size="sm">설명 어쩌구</Text>
          <Text mt={5} c="gray" size="sm">Auto scaling을 지원하는 RDS Aurora 클러스터를 만들어줘. 인스턴스 타입은 db.r5.large로 해줘.</Text>
        </Paper>

        <Paper shadow="md" p="md">
          <Text fw={700} size="sm">설명 어쩌구</Text>
          <Text mt={5} c="gray" size="sm">키 이름이 testkey인 EC2 인스턴스를 생성해줘. 추가로 20GB 크기의 io1 볼륨을 갖는 블록 디바이스 매핑을 포함시켜줘.</Text>
        </Paper>

        <Paper shadow="md" p="md">
          <Text fw={700} size="sm">설명 어쩌구</Text>
          <Text mt={5} c="gray" size="sm">#네트워킹”, “#보안”, “#스토리지” “#데이터베이스”, “EC2” 와 같은 해시태그를 사용할 수 있습니다.</Text>
        </Paper>

        <Paper shadow="md" p="md">
          <Text fw={700} size="sm">설명 어쩌구</Text>
          <Text mt={5} c="gray" size="sm">#네트워킹”, “#보안”, “#스토리지” “#데이터베이스”, “EC2” 와 같은 해시태그를 사용할 수 있습니다.</Text>
        </Paper>
      </SimpleGrid>

        <Textarea
          mt={30}
          placeholder="필요한 리소스를 설명해 주세요."
          autosize
          minRows={1}
          rightSection={icon}
          // onClick={(event) => {
          //   // event.preventDefault();
          //   router.push('/generator')
          //   // setActive('/generator');
          // }}
        />
      </Container>
    );
  }
  