'use client';
import {
  Modal,
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
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useDisclosure } from '@mantine/hooks';

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [nicknameError, setNicknameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isModalOpen, { open, close }] = useDisclosure(false);

  const validateNickname = (value: string) => {
    setNickname(value);
    if (value.length < 3) {
      return false;
    }
    setNicknameError('');
    return true;
  };

  const validatePassword = (value: string) => {
    setPassword(value);
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&.]{8,}$/;
    if (!passwordRegex.test(value)) {
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleSubmit = async (event: any) => {
    setLoading(true);
    event.preventDefault();

    const isNicknameValid = validateNickname(nickname);
    const isPasswordValid = validatePassword(password);

    if (isNicknameValid && isPasswordValid) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/token`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: nickname,
              password: password,
            }),
          },
        );

        if (response.ok) {
          const responseData = await response.json();
          console.log('Success:', responseData);
          login(responseData.access_token);
          router.push('/'); // 로그인 성공 후 리디렉션
          setLoading(false);
        } else {
          const responseData = await response.json();
          open();
          console.error('로그인 실패:', responseData);
          setLoading(false);
        }
      } catch (error) {
        console.error('Network error:', error);
      }
    }
  };

  const isButtonValid =
    nickname && password && !nicknameError && !passwordError;

  return (
    <Container size={840} my={120}>
      <Paper withBorder shadow="md" p={80} mt={30} radius="md">
        <Title ta="center" className={classes.title}>
          Stack OrderFlow시작하기
        </Title>
        <Text c="dimmed" size="sm" ta="center" mt={5}>
          아직 계정이 없다면?{' '}
          <Anchor
            size="sm"
            component="button"
            onClick={(event) => {
              router.push('/signup');
            }}
          >
            계정 생성하기
          </Anchor>
        </Text>

        <TextInput
          label="닉네임"
          placeholder="stack@order.flow"
          required
          mt={40}
          ml={40}
          mr={40}
          value={nickname}
          onChange={(event) => validateNickname(event.currentTarget.value)}
          onBlur={() => validateNickname(nickname)}
          error={nicknameError}
        />
        <PasswordInput
          label="비밀번호"
          placeholder="*********"
          required
          mt="xl"
          ml={40}
          mr={40}
          value={password}
          onChange={(event) => validatePassword(event.currentTarget.value)}
          onBlur={() => validatePassword(password)}
          error={passwordError}
        />
        {/* <Group justify="space-between" mt="lg" ml={40} mr={40}>
          <Checkbox label="비밀번호 저장" />
          <Anchor component="button" size="sm">
            비밀번호 찾기
          </Anchor>
        </Group> */}
        <Group justify="center" mt={40} ml={40} mr={40}>
          <Button
            fullWidth
            type="submit"
            // loading loaderProps={{ type: 'dots' }}
            disabled={!isButtonValid}
            // disabled={!nickname || !password || !passwordConfirmation || nicknameError || passwordError || passwordConfirmationError}
            onClick={handleSubmit}
            loading={loading}
            // style={{
            //   backgroundColor: nickname && password && passwordConfirmation && !nicknameError && !passwordError && !passwordConfirmationError ? undefined : '#grey',
            // }}
          >
            로그인
          </Button>
        </Group>

        <Modal opened={isModalOpen} onClose={close} title="로그인 실패">
          닉네임과 비밀번호를 다시 확인해주세요.
        </Modal>
      </Paper>
    </Container>
  );
}
