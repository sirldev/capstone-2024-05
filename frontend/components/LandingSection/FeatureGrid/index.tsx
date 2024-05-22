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
  IconSocial,
  IconFilter,
  IconCodeDots,
  IconRepeat,
  IconHammer,
} from '@tabler/icons-react';
import classes from './featuregrid.module.css';

export const FEATURE = [
  {
    icon: IconCodeDots,
    title: 'Template Generator',
    description: (
      <>
        RAG 기법, 프롬프트, Validation API를 사용하여 정확한 템플릿 파일을
        생성합니다.
        <br />
        템플릿 파일이 유효하지 않은 경우, 에러 메세지를 기반으로 템플릿 파일을
        재생성하여 정확도를 향상합니다.
      </>
    ),
  },
  {
    icon: IconFilter,
    title: 'Validation API',
    description:
      'AWS CLI의 validate-template 명령어를 기반한 자체 Validation API를 통해 템플릿 파일의 높은 신뢰성을 보장합니다.',
  },

  {
    icon: IconSocial,
    title: 'Template Hub',
    description:
      '생성한 템플릿을 공유하고, 다른 사용자가 생성한 템플릿 파일을 AWS 리소스 기반으로 검색할 수 있습니다.',
  },
];

export const DIFFERENCE = [
  {
    icon: IconHammer,
    title: '생산성 증가',
    description:
      '7,000개가 넘는 AWS CloudFormation의 문서를 읽고 이해하는 데 약 18일이 소요됩니다. StackOrderFlow를 사용하면 20초 안에 AWS 리소스를 배포할 수 있습니다.',
  },
  {
    icon: IconGauge,
    title: '정확도 증가',
    description: (
      <>
        StackOrderFlow는 GPT-4 대비 <strong>65% 높은 정확도</strong>를
        보여줍니다.
        <br />
        또한, 생성된 템플릿 파일은{' '}
        <strong>사용자 요구사항의 94% 이상을 충족</strong>하여 요청된 내용을 잘
        반영합니다.
      </>
    ),
  },
  {
    icon: IconRepeat,
    title: '재사용성 증가',
    description:
      '템플릿 허브에서 다른 사용자가 생성한 템플릿 파일을 검색하고 활용함으로써 재사용성을 높일 수 있습니다.',
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
          Primary Features
        </Text>{' '}
      </Title>

      <Container size={700} p={0}>
        <Text size="sm" className={classes.description}>
          StackOrderFlow는 다음과 같은 주요 기능을 가지고 있습니다.
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
          Anticipated benefits
        </Text>{' '}
      </Title>

      <Container size={700} p={0}>
        <Text size="sm" className={classes.description}>
          StackOrderFlow는 다음과 같은 기대 효과를 가지고 있습니다.
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
