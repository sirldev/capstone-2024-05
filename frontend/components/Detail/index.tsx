'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import {
  Container,
  Card,
  Title,
  Badge,
  UnstyledButton,
  Textarea,
  Text,
  Button,
  Group,
  AppShell,
  Burger,
  Grid,
  SimpleGrid,
  Paper,
} from '@mantine/core';
import Result from '@/components/UsePage/Result';
import References from '@/components/UsePage/References/Index';
import classes from './Detail.module.css';

export default function DetailPage() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  return (
    <div className={classes.wrapper}>
      <Container size="lg" className={classes.inner}>
        <Title className={classes.title} mt={0}>
          템플릿 상세 보기
        </Title>

        <Grid grow mt="xl">
          <Grid.Col span={8}>
            <Result />
          </Grid.Col>
          <Grid.Col span={4}>
            <References />
          </Grid.Col>
        </Grid>
      </Container>
    </div>
  );
}
