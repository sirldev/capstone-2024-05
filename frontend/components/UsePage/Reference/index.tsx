import { Text, Paper } from '@mantine/core';
import { useEffect, useState } from 'react';

export default function Reference({ reference }: { reference: string }) {
  const [isExist, setExist] = useState(false);
  const [description, setDescription] = useState('');

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
        window.open(`/docs/${reference.replace('.md', '')}`, '_blank');
        // router.push(`/docs/${reference.replace('.md', '')}`, {});
      }}
      style={{ cursor: 'pointer' }}
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
