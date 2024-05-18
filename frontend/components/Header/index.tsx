'use client';

import { useState, useEffect } from 'react';
import { Modal, Container, Group, Burger, Text, Menu, Center, Image } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './header.module.css';
import { IconChevronDown } from '@tabler/icons-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

interface LinkItem {
  link: string;
  label: string;
  links?: LinkItem[];
}

const leftLinks = [
  { link: '/', label: 'About' },
  { link: '/generator', label: 'Template Generator' },
  { link: '/hub', label: 'Template Hub' },
  // { link: '/login', label: 'Login' },
];

const loggedInLinks : LinkItem= 
  {
    link: '#2',
    label: 'My Page',
    links: [
      { link: '/mypage', label: 'My Page' },
      { link: '/', label: 'Logout' }
    ],
  };

const loggedOutLinks: LinkItem = 
  { link: '/login', label: 'Login' };

export default function Header() {
  // useEffect(() => {
  //   setActive(router);
  // }, [router.pathname]);

  const router = useRouter();
  const pathname = usePathname();
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(leftLinks[0].link);
  const { isLoggedIn, login, logout } = useAuth();
  const [isModalOpen, { open, close }] = useDisclosure(false);

  useEffect(() => {
    setActive(pathname);
  }, [pathname]);

  const leftItems = leftLinks.map((link) => (
    <Link
      key={link.label}
      href={link.link}
      className={classes.link}
      data-active={active === link.link || undefined}
      onClick={(event) => {
        // event.preventDefault();
        router.push(link.link);
        setActive(link.link);
      }}
    >
      {link.label}
    </Link>
  ));
  
  const rightItems = isLoggedIn ? (
    
        <Menu key={loggedInLinks.label} trigger="hover" transitionProps={{ exitDuration: 0 }} withinPortal>
          <Menu.Target>
            <a
              href={loggedInLinks.link}
              className={classes.link}
              onClick={(event) => event.preventDefault()}
            >
              <Center>
                <span className={classes.linkLabel}>{loggedInLinks.label}</span>
                <IconChevronDown size="0.9rem" stroke={1.5} />
              </Center>
            </a>
          </Menu.Target>
          <Menu.Dropdown>
          {loggedInLinks.links?.map((item) => (
              <Link
                key={item.link}
                href={item.link}
                className={classes.link}
                onClick={(event) => {
                  if (item.label === 'Logout') {
                    logout(); // 로그아웃 함수 호출
                    open();
                    router.push('/'); // 로그아웃 후 리디렉션
                  } else {
                    router.push(item.link);
                    setActive(item.link);
                  }
                  event.preventDefault();
                  router.push(item.link);
                  setActive(item.link);
                }}
              >
                {item.label}
              </Link>
            ))}
          </Menu.Dropdown>
        </Menu> ) :
        (
    <Link
      key={loggedOutLinks.label}
      href={loggedOutLinks.link}
      className={classes.link}
      data-active={active === loggedOutLinks.link || undefined}
      onClick={(event) => {
        // event.preventDefault();
        // if (link.link == '/login') {
        //   console.log('login')
        //   return
        // }
        router.push(loggedOutLinks.link);
        setActive(loggedOutLinks.link);
      }}
    >
      {loggedOutLinks.label}
    </Link>
        );

  return (
    <header className={classes.header}>
      <Container className={classes.inner}>
        <Group>
          <Image className={classes.logo} src="/logo.png" onClick={(event) => {
              router.push('/');
            }}/>
          <Group gap={5} visibleFrom="sm">
            {leftItems}
          </Group>
        </Group>

        <Group gap={5} visibleFrom="sm">
          {rightItems}
        </Group>
        
        {/* <div className="font-bold text-[#0076E2]">StackOrderFlow</div> */}

        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />

        <Modal
          opened={isModalOpen}
          onClose={close}
          title="로그아웃 되었습니다"
        >
          
        </Modal>
      </Container>
    </header>
  );
}
