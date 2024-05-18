import DetailPage from '@/components/Detail';
import axios from 'axios';

interface IParams {
  id: string;
}

async function getTemplate(id: number) {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/templates/${id}`,
  );

  return data;
}

export default async function TemplateHubPage({ params }: { params: IParams }) {
  const template = await getTemplate(Number(params.id));

  return <DetailPage template={template} />;
}
