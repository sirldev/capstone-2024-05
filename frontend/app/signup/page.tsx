'use client'

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
import classes from './signup.module.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Signup() {
  const [loading, setLoading] = useState(false);
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [nicknameError, setNicknameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordConfirmationError, setPasswordConfirmationError] = useState('');
  const router = useRouter();

  const validateNickname = (value : string) => {
    setNickname(value);
    if (value.length < 3) {
      setNicknameError('닉네임은 최소 3글자 이상 입력되어야 합니다.');
      return false;
    }
    setNicknameError('');
    return true;
  };

  const validatePassword = (value: string) => {
    setPassword(value);
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&.]{8,}$/;
    if (!passwordRegex.test(value)) {
      setPasswordError('비밀번호는 8자 이상, 영어와 숫자를 포함해야 합니다.');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const validatePasswordConfirmation = (value : string) => {
    setPasswordConfirmation(value);
    if (value !== password) {
      setPasswordConfirmationError('비밀번호를 다시 확인해 주세요.');
      return false;
    }
    setPasswordConfirmationError('');
    return true;
  };

  const handleSubmit = async (event:any) => {
    setLoading(true); 
    event.preventDefault(); 

    const isNicknameValid = validateNickname(nickname);
    const isPasswordValid = validatePassword(password);
    const isPasswordConfirmationValid = validatePasswordConfirmation(passwordConfirmation);
  
    if (isNicknameValid && isPasswordValid && isPasswordConfirmationValid) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/create_user`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: nickname,
            password: password,
            password_confirmation: passwordConfirmation,
          }),
        });
        
        if (response.ok) {
          const responseData = await response.json();
          console.log('Success:', responseData);
          router.push('/login'); // 회원가입 성공 후 리디렉션
        } else {
          const responseData = await response.json(); 
          if (responseData.detail == 'Username already registered') {
            setNicknameError('사용된 닉네임입니다')
          } else {
            setNicknameError(`${responseData.detail}`)
          }
          console.error('회원가입 실패:', responseData);
          setLoading(false);

        }
      } catch (error) {
        console.error('Network error:', error);
      }
    }
  };

  const isButtonValid = nickname && password && passwordConfirmation && !nicknameError && !passwordError && !passwordConfirmationError;


  return (
    <Container size={840} my={120}>

      <Paper withBorder shadow="md" p={80} mt={30} radius="md">
        <Title ta="center" className={classes.title}>
          Stack OrderFlow 가입하기
        </Title>
        <form onSubmit={handleSubmit}>
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

        <PasswordInput
          label="비밀번호 확인"
          placeholder="*********"
          required
          mt="xl"
          ml={40}
          mr={40}
          value={passwordConfirmation}
          onChange={(event) => validatePasswordConfirmation(event.currentTarget.value)}
          // onBlur={() => validatePasswordConfirmation(passwordConfirmation)}
          error={passwordConfirmationError}
        />

        <Group justify="center" mt={40} ml={40} mr={40}>
          <Button
            fullWidth
            type="submit"
            // loading loaderProps={{ type: 'dots' }}
            disabled = {!isButtonValid}
            // disabled={!nickname || !password || !passwordConfirmation || nicknameError || passwordError || passwordConfirmationError}
            onClick={handleSubmit}
            loading={loading}
            // style={{
            //   backgroundColor: nickname && password && passwordConfirmation && !nicknameError && !passwordError && !passwordConfirmationError ? undefined : '#grey',
            // }}
          >
            가입하기</Button>
        </Group>
        </form>
      </Paper>
    </Container>
  );
}
