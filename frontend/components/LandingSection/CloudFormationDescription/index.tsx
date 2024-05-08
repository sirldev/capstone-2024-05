import {
  ThemeIcon,
  Text,
  Title,
  Container,
  SimpleGrid,
  rem,
  List,
  Button,
} from '@mantine/core';
import {
  IconGauge,
  IconCookie,
  IconUser,
  IconMessage2,
  IconLock,
  IconExternalLink,
} from '@tabler/icons-react';
import classes from './cloudformationdescription.module.css';

export const FEATURE = [
  {
    icon: IconGauge,
    title: 'Aws CloudFormation이 무엇인가요?',
    description:
      'AWS CloudFormation은 Amazon Web Services(AWS)에서 제공하는 서비스로, 사용자가 쉽게 클라우드 기반 리소스를 모델링하고 설정할 수 있도록 도와줍니다. 이를 통해 전체 인프라를 코드 형식으로 관리할 수 있으며, 이 코드를 사용하여 서버, 데이터베이스, 네트워크 구성 등의 AWS 리소스를 일관되고 자동화된 방식으로 배포할 수 있습니다.',
  },
  {
    icon: IconCookie,
    title: '왜 사용해야 하나요?',
    description:
      '복잡한 인프라 설정과 관리를 자동화하여 수동 작업에 필요한 시간과 비용을 절감하고, 수동 프로세스에서 발생할 수 있는 인간의 오류를 줄이며, 일관된 인프라 구성을 통해 보안 표준과 규정 준수 요구사항을 쉽게 충족시킬 수 있습니다.',
  },
  {
    icon: IconUser,
    title: '어떻게 시작하나요?',
    description:
      'AWS CloudFormation을 사용하기 위해, 사용자는 JSON 또는 YAML 포맷의 템플릿 파일을 생성하여 AWS에 업로드해야 합니다. 이 템플릿은 필요한 모든 AWS 리소스와 그 속성들을 정의합니다. AWS CloudFormation 콘솔, AWS CLI, 또는 AWS API를 통해 이 템플릿을 실행시킬 수 있습니다.',
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
      <Text mt="sm" mb={7}>
        {title}
      </Text>
      <Text size="sm" c="dimmed" lh={1.6}>
        {description}
      </Text>
    </div>
  );
}

export default function CloudFormationDescription() {
  const features = FEATURE.map((feature, index) => (
    <Feature {...feature} key={index} />
  ));

  const icon = <IconExternalLink size={14} color="White" />;

  return (
    <Container className={classes.wrapper}>
      <Title className={classes.title}>
        <Text
          component="span"
          variant="gradient"
          gradient={{ from: '#FFA500', to: '#AE5A00' }}
          inherit
        >
          AWS CloudFormation
        </Text>{' '}
      </Title>

      {/* <Container size={700} p={0}>
          <Text size="sm" className={classes.description}>
            Stack OrderFlow는 다음과 같은 특징을 가지고 있습니다.
          </Text>
        </Container> */}

      <SimpleGrid
        mt={30}
        cols={{ base: 1, sm: 1, md: 1 }}
        spacing={{ base: 'xs', md: 50 }}
        verticalSpacing={{ base: 'xl', md: 30 }}
      >
        {features}
        <Button
          fullWidth
          component="a"
          href="https://docs.aws.amazon.com/ko_kr/cloudformation/"
          target="_blank"
          variant="gradient"
          rightSection={icon}
          justify="space-between"
          gradient={{ from: '#FFA500', to: '#C86A00', deg: 90 }}
        >
          Aws CloudFormation 공식 홈페이지
        </Button>
      </SimpleGrid>
    </Container>
  );
}
