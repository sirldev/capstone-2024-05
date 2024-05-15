import { Alert, Container } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main style={{ position: 'relative', boxSizing: 'border-box' }}>
      <Container size={700} pos="relative" pt={24}>
        <Alert
          variant="light"
          color="red"
          title="주의"
          icon={<IconInfoCircle />}
        >
          해당 문서는 AI로 번역된 문서로 문서의 내용이 매끄럽지 않을 수
          있습니다.
        </Alert>
        {children}
      </Container>
    </main>
  );
}
