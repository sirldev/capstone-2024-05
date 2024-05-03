import '@mantine/core/styles.css';
import '@mantine/nprogress/styles.css';
import '@/app/globals.css';

import type { Metadata } from 'next';

import { ColorSchemeScript, MantineProvider, createTheme } from '@mantine/core';

import Header from '@/components/Header';
import { NavigationProgress } from '@mantine/nprogress';

export const metadata: Metadata = {
  title: 'StackOrderFlow - 자연어 기반 AWS CloudFormation 템플릿 생성 서비스',
  description: '자연어 기반 AWS CloudFormation 템플릿 생성 서비스',
};

const theme = createTheme({
  fontFamily: 'Pretendard, sans-serif',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body
      //  className={inter.className}>
      >
        <MantineProvider theme={theme}>
          <NavigationProgress />
          <Header />
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
