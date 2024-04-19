'use client';

import { Container, Title, Textarea, Text, Button, Group, AppShell, Burger, Grid, SimpleGrid, Paper } from '@mantine/core';
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
import FeaturesGrid from '../FeatureGrid';
import CloudFormationDescription from '../CloudFormationDescription';
import Usage from '../Usage';
import Header from '../Header';
import UserInput from './UserInput/Index';
import References from './References/Index';
import { AWSDescription } from './AWSDescription/Index';
import { useState } from 'react';
import Result from './Result';

export default function UsePage() {
  
  const [currentComponent, setCurrentComponent] = useState('AWSDescription');

  const handleComponentChange = () => {
    setCurrentComponent('References');
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
          </Container> :
          <Container size="lg" className={classes.inner}>
          
            <Title className={classes.title} mt={0}>
              템플릿 생성 중..
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
