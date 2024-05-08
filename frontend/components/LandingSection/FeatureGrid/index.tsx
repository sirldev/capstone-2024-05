import {
  ThemeIcon,
  Text,
  Title,
  Container,
  SimpleGrid,
  rem,
} from '@mantine/core';
import {
  IconGauge,
  IconCookie,
  IconUser,
  IconMessage2,
  IconLock,
} from '@tabler/icons-react';
import classes from './featuregrid.module.css';

export const FEATURE = [
  {
    icon: IconGauge,
    title: '진입 장벽 제거',
    description:
      '복잡한 CloudFormation의 문법과 방대한 문서 학습 필요 없이, 모든 사용자가 클라우드 리소스를 쉽게 관리할 수 있습니다.',
  },
  {
    icon: IconUser,
    title: '자연어 분석',
    description:
      '사용자가 자연어로 필요한 인프라를 설명하면, AI가 이를 분석하여 필요한 CloudFormation 템플릿을 자동으로 생성합니다.',
  },
  {
    icon: IconCookie,
    title: 'Secure by default',
    description:
      'Although it still can’t fly, its jumping power is outstanding, in Alola the mushrooms on Paras don’t grow up quite right',
  },
];

export const DIFFERENCE = [
  {
    icon: IconLock,
    title: 'CloudFormation 특화',
    description:
      'RAG 기술을 적용하여 사용자의 요구에 가장 관련성 높은 정보를 검색하고 이를 바탕으로 템플릿을 생성합니다.',
  },
  {
    icon: IconGauge,
    title: 'Template Hub',
    description:
      '사용자들은 Template Hub를 통해 생성한 템플릿을 공유할 수 있으며, 다른 사용자들의 프롬프트와 템플릿을 참고할 수 있습니다.',
  },
  {
    icon: IconCookie,
    title: '유효성 검증',
    description:
      '템플릿 파일의 유효성 검증 기능을 통해서 신뢰도가 높은 템플릿 파일을 생성합니다.',
  },
];

interface FeatureProps {
  icon: React.FC<any>;
  title: React.ReactNode;
  description: React.ReactNode;
}

export function Feature({ icon: Icon, title, description }: FeatureProps) {
  return (
    <div>
      <ThemeIcon variant="light" size={40} radius={40}>
        <Icon style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
      </ThemeIcon>
      <Text mt="sm" mb={7}>
        {title}
      </Text>
      <Text size="sm" c="dimmed" lh={1.6}>
        {description}
      </Text>
    </div>
  );
}

export default function FeaturesGrid() {
  const features = FEATURE.map((feature, index) => (
    <Feature {...feature} key={index} />
  ));

  const differences = DIFFERENCE.map((feature, index) => (
    <Feature {...feature} key={index} />
  ));

  return (
    <Container className={classes.wrapper}>
      <Title className={classes.title}>
        <Text
          component="span"
          variant="gradient"
          gradient={{ from: 'blue', to: 'cyan' }}
          inherit
        >
          Feature
        </Text>{' '}
      </Title>

      <Container size={700} p={0}>
        <Text size="sm" className={classes.description}>
          Stack OrderFlow는 다음과 같은 특징을 가지고 있습니다.
        </Text>
      </Container>

      <SimpleGrid
        mt={30}
        cols={{ base: 1, sm: 2, md: 3 }}
        spacing={{ base: 'xs', md: 50 }}
        verticalSpacing={{ base: 'xl', md: 50 }}
      >
        {features}
      </SimpleGrid>
      {/*  */}

      <Title className={classes.title} mt={60}>
        <Text
          component="span"
          variant="gradient"
          gradient={{ from: 'blue', to: 'cyan' }}
          inherit
        >
          Differences
        </Text>{' '}
      </Title>

      <Container size={700} p={0}>
        <Text size="sm" className={classes.description}>
          왜 다른 챗봇이 아닌 Stack OrderFlow를 사용해야 할까요?
        </Text>
      </Container>

      <SimpleGrid
        mt={30}
        cols={{ base: 1, sm: 2, md: 3 }}
        spacing={{ base: 'xs', md: 50 }}
        verticalSpacing={{ base: 'xl', md: 50 }}
      >
        {differences}
      </SimpleGrid>
    </Container>
  );
}
