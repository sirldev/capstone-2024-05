'use client';

import { useState } from 'react';
import { Container, Group, Burger, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './header.module.css';
import Link from 'next/link';

const links = [
  { link: '/', label: 'About' },
  { link: '/pricing', label: 'Template Generator' },
  { link: '/learn', label: 'Template Hub' },
  //   { link: '/community', label: 'Community' },
];

export default function Header() {
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);

  const items = links.map((link) => (
    <Link
      key={link.label}
      href={link.link}
      className={classes.link}
      data-active={active === link.link || undefined}
      onClick={(event) => {
        event.preventDefault();
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
        <Group gap={5} visibleFrom="xs">
          {items}
        </Group>

        <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
      </Container>
    </header>
  );
}
