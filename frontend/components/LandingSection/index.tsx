'use client'

import { Container, Text, Button, Group } from '@mantine/core';
// import { GithubIcon } from '@mantinex/dev-icons';
import classes from './landing.module.css';
import FeaturesGrid from '../FeatureGrid';
import CloudFormationDescription from '../CloudFormationDescription';
import Usage from '../Usage';
import { useRouter } from 'next/navigation';

export default function LandingSection() {
  const router = useRouter()
  return (
    <div className={classes.wrapper}>
      <Container size={700} className={classes.inner}>
        <h1 className={classes.title} >
          {/* A{' '}
          <Text
            component="span"
            variant="gradient"
            gradient={{ from: 'blue', to: 'cyan' }}
            inherit
          >
            fully featured
          </Text>{' '}
          React components and hooks library */}
          쉽고, 빠르게, 실수없이 <br />AWS를 시작하세요
          {/* <br/> AWS CloudFormation <br/> 템플릿을 생성해보세요. */}
        </h1>

        <Text className={classes.description} color="dimmed">
          필요한 리소스들을 입력하세요. 사용자의 자연어 입력을 분석하여 AWS CloudFormation 템플릿을 자동으로 생성해 줍니다.
        </Text>

        <Group className={classes.controls}>
          <Button
            size="xl"
            className={classes.control}
            variant="gradient"
            gradient={{ from: 'blue', to: 'cyan' }}
            onClick={(event) => {
              // event.preventDefault();
              router.push('/generator')
              // setActive('/generator');
            }}
          >
            템플릿 생성하기
          </Button>

          {/* <Button
            component="a"
            href="https://github.com/mantinedev/mantine"
            size="xl"
            variant="default"
            className={classes.control}
            // leftSection={<GithubIcon size={20} />}
          >
            GitHub
          </Button> */}
        </Group>
      </Container>
      <Container size={700} className={classes.inner}>
        <FeaturesGrid />
      </Container>

      <Container size={700} className={classes.inner}>
        <CloudFormationDescription />
      </Container>
      <Container size={700} className={classes.inner}>
        <Usage />
      </Container>
    </div>
  );
}
