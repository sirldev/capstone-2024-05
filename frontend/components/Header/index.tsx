'use client';

import { useState, useEffect } from 'react';
import { Container, Group, Burger, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './header.module.css';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const links = [
  { link: '/', label: 'About' },
  { link: '/generator', label: 'Template Generator' },
  { link: '/hub', label: 'Template Hub' },
  { link: '/login', label: 'Login' },
];

export default function Header() {
  // useEffect(() => {
  //   setActive(router);
  // }, [router.pathname]);

  const router = useRouter();
  const pathname = usePathname();
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);

  useEffect(() => {
    setActive(pathname);
  }, [pathname]);

  const items = links.map((link) => (
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

  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>
        <Text
          component="span"
          variant="gradient"
          gradient={{ from: 'cyan', to: 'black' }}
          inherit
          fw={700}
        >
          StackOrderFlow
        </Text>
        {/* <div className="font-bold text-[#0076E2]">StackOrderFlow</div> */}
        <Group gap={5} visibleFrom="sm">
          {items}
        </Group>

        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
      </Container>
    </header>
  );
}
