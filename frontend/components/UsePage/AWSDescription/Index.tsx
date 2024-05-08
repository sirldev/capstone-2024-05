import {
  Title,
  SimpleGrid,
  Text,
  Button,
  ThemeIcon,
  Grid,
  rem,
  Container,
} from '@mantine/core';
import {
  IconReceiptOff,
  IconFlame,
  IconCircleDotted,
  IconFileCode,
} from '@tabler/icons-react';
import classes from './AWSDesciption.module.css';

const features = [
  {
    icon: IconReceiptOff,
    title: 'EC2',
    description: '클라우드의 가상 서버',
  },
  {
    icon: IconFileCode,
    title: 'Simple Storage Service(S3)',
    description: '클라우드에서의 확장 가능한 스토리지',
  },
  {
    icon: IconCircleDotted,
    title: 'Aurora',
    description:
      'MySQL 및 PostgreSQL과 완벽하게 호환되는 고성능 관리형 관계형 데이터베이스',
  },
  {
    icon: IconFlame,
    title: 'DynamoDB',
    description: '관리형 NoSQL 데이터베이스',
  },
];

export function AWSDescription() {
  const items = features.map((feature) => (
    <div key={feature.title}>
      <ThemeIcon
        size={24}
        radius="md"
        variant="gradient"
        gradient={{ deg: 133, from: 'blue', to: 'cyan' }}
      >
        <feature.icon style={{ width: rem(16), height: rem(16) }} stroke={2} />
      </ThemeIcon>
      <Text fz="lg" mt={0} fw={500}>
        {feature.title}
      </Text>
      <Text c="dimmed" fz="sm">
        {feature.description}
      </Text>
    </div>
  ));

  return (
    <Container className={classes.wrapper}>
      <Title className={classes.title} order={2}>
        AWS 란?
      </Title>
      <Text c="dimmed">
        AWS는 가상 서버부터 인공 지능에 이르기까지 다양한 서비스와 도구를
        제공하여, 사용자가 IT 인프라를 구축하고 관리할 수 있게 지원합니다.
      </Text>

      <SimpleGrid cols={{ base: 1, sm: 1, md: 1 }} spacing={20} mt={20}>
        {items}
      </SimpleGrid>
    </Container>
  );
}
