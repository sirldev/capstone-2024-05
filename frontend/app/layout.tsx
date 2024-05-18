// 'use client'

import '@mantine/core/styles.css';
import '@mantine/nprogress/styles.css';
import '@/app/globals.css';
import { AuthProvider } from '../context/AuthContext';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { usePathname } from 'next/navigation';
import './globals.css';
import Header from '@/components/Header';

import { ColorSchemeScript, MantineProvider, createTheme } from '@mantine/core';

import { NavigationProgress } from '@mantine/nprogress';

export const metadata: Metadata = {
  title: 'StackOrderFlow - 자연어 기반 AWS CloudFormation 템플릿 생성 서비스',
  description: '자연어 기반 AWS CloudFormation 템플릿 생성 서비스',
  icons: {
    icon: "/icon.png",
  },

};

const theme = createTheme({
  fontFamily: 'Pretendard, sans-serif',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const pathname = usePathname();
  // const showHeader = !pathname.includes('/login'); // 로그인 페이지가 아닐 때 헤더 표시

  return (
    <AuthProvider>
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
    </AuthProvider>
  );
}
