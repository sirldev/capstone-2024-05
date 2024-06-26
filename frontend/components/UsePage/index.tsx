'use client';

import {
  Modal,
  Container,
  Title,
  LoadingOverlay,
  Loader,
  Grid,
} from '@mantine/core';
// import { GithubIcon } from '@mantinex/dev-icons';
import classes from './usepage.module.css';
import UserInput from './UserInput/Index';
import References from './References/Index';
import { AWSDescription } from './AWSDescription/Index';

import axios from 'axios';
import { useState } from 'react';
import Result from './Result';
import { useAuth } from '@/context/AuthContext';
import { useDisclosure } from '@mantine/hooks';

export default function UsePage() {
  const [prompt, setPrompt] = useState('');
  const [template, setTemplate] = useState();
  const [description, setDescription] = useState('');
  const [hashtagList, setHashtagList] = useState([]);
  const [documentList, setDocumentList] = useState([]);
  const [currentComponent, setCurrentComponent] = useState('AWSDescription');
  const [visible, setVisible] = useState(false);
  const { isLoggedIn, accessToken } = useAuth();
  const [isModalOpen, { open, close }] = useDisclosure(false);

  const handleComponentChange = () => {
    // visible을 true로 설정하여 로딩 오버레이를 활성화
    setVisible(true);
    const config: { headers: { Authorization?: string }; timeout?: number } = {
      headers: {},
    };

    config.timeout = 60000;
    if (isLoggedIn) {
      config.headers['Authorization'] = `${accessToken}`;
    }
    // 5초 후에 visible을 false로 설정하여 로딩 오버레이를 비활성화
    // setTimeout(() => {
    //   setVisible(false);
    //   setCurrentComponent('References'); // 이 부분은 다른 컴포넌트 로직에 맞게 설정
    // }, 3500);

    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/templates`,
        {
          prompt,
        },
        config,
      )
      .then((res) => {
        console.log(res);
        setTemplate(res.data);
        setDescription(res.data.description);
        setDocumentList(res.data.documents);
        setCurrentComponent('References');
      })
      .catch((error) => {
        open();
      })
      .finally(() => {
        setVisible(false);
      });
  };

  return (
    <div className={classes.wrapper}>
      {currentComponent === 'AWSDescription' ? (
        <Container size="lg" className={classes.inner}>
          <Title className={classes.title} mt={0}>
            어떤 AWS 리소스가 필요하세요?
          </Title>

          <Grid grow mt="xl">
            <Grid.Col span={8}>
              <UserInput
                text={prompt}
                setText={setPrompt}
                onButtonClick={handleComponentChange}
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <AWSDescription />
            </Grid.Col>
          </Grid>

          <LoadingOverlay
            visible={visible}
            loaderProps={{
              children: <Loader color="blue" size="xl" type="dots" />,
            }}
          />
        </Container>
      ) : (
        <Container size="lg" className={classes.inner}>
          <Title className={classes.title} mt={0}>
            템플릿 생성 완료
          </Title>

          <Grid grow mt="xl">
            <Grid.Col span={8}>
              <Result template={template} />
            </Grid.Col>
            <Grid.Col span={4}>
              <References references={documentList} />
            </Grid.Col>
          </Grid>
        </Container>
      )}

      <Modal opened={isModalOpen} onClose={close} title="템플릿 생성 실패">
        필요한 리소스를 구체적으로 입력해주세요.
      </Modal>
    </div>
  );
}
