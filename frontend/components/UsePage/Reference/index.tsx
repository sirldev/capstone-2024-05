import { Text, Paper } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Reference({ reference }: { reference: string }) {
  const [isExist, setExist] = useState(false);
  const [description, setDescription] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetch(`/docs/${reference.replace('.md', '')}`).then((res) => {
      if (res.status === 200) {
        setExist(true);
        res.text().then((r) => {
          setDescription(r.split(`<p>`)[1].split('</p>')[0]);
        });
      }
    });
  }, []);

  if (!isExist) {
    return <></>;
  }

  return (
    <Paper
      shadow="md"
      p="md"
      onClick={() => {
        router.push(`/docs/${reference.replace('.md', '')}`);
      }}
    >
      <Text fw={700} size="sm" truncate="end">
        {reference.replace('.md', '')}
      </Text>
      <Text mt={5} c="gray" size="xs" lineClamp={4}>
        {description}
      </Text>
    </Paper>
  );
}
