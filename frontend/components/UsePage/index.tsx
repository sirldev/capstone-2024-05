'use client';

import { Container, Title, LoadingOverlay, Loader, Textarea, Text, Button, Group, AppShell, Burger, Grid, SimpleGrid, Paper } from '@mantine/core';
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
import classes from './usepage.module.css';
import FeaturesGrid from '../LandingSection/FeatureGrid';
import CloudFormationDescription from '../LandingSection/CloudFormationDescription';
import Usage from '../LandingSection/Usage';
import Header from '../Header';
import UserInput from './UserInput/Index';
import References from './References/Index';
import { AWSDescription } from './AWSDescription/Index';
import { useState } from 'react';
import Result from './Result';

export default function UsePage() {
  
  const [currentComponent, setCurrentComponent] = useState('AWSDescription');
  const [visible, setVisible] = useState(false);

  const handleComponentChange = () => {
    // visible을 true로 설정하여 로딩 오버레이를 활성화
    setVisible(true);

    // 5초 후에 visible을 false로 설정하여 로딩 오버레이를 비활성화
    setTimeout(() => {
      setVisible(false);
      setCurrentComponent('References'); // 이 부분은 다른 컴포넌트 로직에 맞게 설정
    }, 3500);
  };

  return (
    <div className={classes.wrapper}>
      {/* <Container size="lg" className={classes.inner}>
        {currentComponent === 'AWSDescription' ? 
          <Title className={classes.title} mt={0}>
              어떤 AWS 리소스가 필요하세요?
          </Title> : 
          <Title className={classes.title} mt={0}>
            템플릿 생성 중..
          </Title>
          }
          
          <Grid grow mt='xl'>
            <Grid.Col span={8}>
              <UserInput onButtonClick={handleComponentChange}/>
            </Grid.Col>
            <Grid.Col span={4}>
              {currentComponent === 'AWSDescription' ? <AWSDescription /> : <References />}
            </Grid.Col>
          </Grid>
        </Container> */}


        {currentComponent === 'AWSDescription' ? 
          <Container size="lg" className={classes.inner}>
          
            <Title className={classes.title} mt={0}>
                어떤 AWS 리소스가 필요하세요?
            </Title> 
            
            <Grid grow mt='xl'>
              <Grid.Col span={8}>
                <UserInput onButtonClick={handleComponentChange}/>
              </Grid.Col>
              <Grid.Col span={4}>
                <AWSDescription />
              </Grid.Col>
            </Grid>

            <LoadingOverlay visible={visible} loaderProps={{ children: <Loader color="blue" size="xl" type="dots" /> }} />
          </Container> :
          
          <Container size="lg" className={classes.inner}>
          
            <Title className={classes.title} mt={0}>
              템플릿 생성 완료
            </Title> 
            
            <Grid grow mt='xl'>
              <Grid.Col span={8}>
                <Result />
              </Grid.Col>
              <Grid.Col span={4}>
                <References />
              </Grid.Col>
            </Grid>

            
          </Container>
        }
          
          
    </div>
  );
}
