'use client';

import {
  Container,
  Textarea,
  Text,
  Title,
  Button,
  Group,
  AppShell,
  Burger,
  Grid,
  SimpleGrid,
  Paper,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconGauge,
  IconCookie,
  IconUser,
  IconMessage2,
  IconLock,
  IconArrowRight,
} from '@tabler/icons-react';
import Link from 'next/link';
// import { GithubIcon } from '@mantinex/dev-icons';
import classes from './references.module.css';
import FeaturesGrid from '../../LandingSection/FeatureGrid';
import CloudFormationDescription from '../../LandingSection/CloudFormationDescription';
import Usage from '../../LandingSection/Usage';
import Header from '../../Header';
import { useRouter } from 'next/navigation';
import Reference from '../Reference';

export default function References({ references }: { references: string[] }) {
  // const [opened, { toggle }] = useDisclosure(false);
  // const handleClick = () => {
  //   console.log('버튼이 클릭되었습니다!');
  // };
  const router = useRouter();
  return (
    <div>
      <Title className={classes.title}>참고 문서</Title>
      <SimpleGrid
        mt={10}
        cols={{ base: 1, sm: 1, md: 2 }}
        spacing={{ base: 'xs', md: 20 }}
        verticalSpacing={{ base: 'xl', md: 20 }}
      >
        {references.map((ref, idx) => (
          <Reference key={`ref-${idx}`} reference={ref} />
        ))}
      </SimpleGrid>
    </div>
  );
}
