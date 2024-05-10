import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  Highlight,
  Center,
} from '@mantine/core';
import classes from './Login.module.css';

export default function AuthenticationTitle() {
  return (
    <Container size={840} my={120}>
      {/* <Highlight
        ta="center"
        highlight={['Stack OrderFlow']}
        highlightStyles={{
          backgroundImage:
            'linear-gradient(45deg, var(--mantine-color-cyan-5), var(--mantine-color-indigo-5))',
          fontWeight: 700,
          WebkitBackgroundClip: 'text',
          fontSize: 30,
          WebkitTextFillColor: 'transparent',
        }}
      >
      Stack OrderFlow 시작하기
    </Highlight> */}

      <Paper withBorder shadow="md" p={80} mt={30} radius="md">
        <Title ta="center" className={classes.title}>
          Stack OrderFlow시작하기
        </Title>
        <Text c="dimmed" size="sm" ta="center" mt={5}>
          아직 계정이 없다면?{' '}
          <Anchor size="sm" component="button">
            계정 생성하기
          </Anchor>
        </Text>

        <TextInput
          label="이메일"
          placeholder="stack@order.flow"
          required
          mt={40}
          ml={40}
          mr={40}
        />
        <PasswordInput
          label="비밀번호"
          placeholder="*********"
          required
          mt="xl"
          ml={40}
          mr={40}
        />
        <Group justify="space-between" mt="lg" ml={40} mr={40}>
          <Checkbox label="비밀번호 저장" />
          <Anchor component="button" size="sm">
            비밀번호 찾기
          </Anchor>
        </Group>
        <Group justify="center" mt="xl" ml={40} mr={40}>
          <Button fullWidth>로그인</Button>
        </Group>
      </Paper>
    </Container>
  );
}
