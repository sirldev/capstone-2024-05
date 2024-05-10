import { Container } from '@mantine/core';

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main style={{ position: 'relative', boxSizing: 'border-box' }}>
      <Container size={700} pos="relative">
        {children}
      </Container>
    </main>
  );
}
