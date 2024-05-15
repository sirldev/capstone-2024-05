import DetailPage from '@/components/Detail';
import axios from 'axios';

interface IParams {
  id: string;
}

async function getTemplate(id: number) {
  const { data } = await axios.get(
    `http://ec2-54-180-98-97.ap-northeast-2.compute.amazonaws.com:8000/templates/${id}`,
  );

  return data;
}

export default async function TemplateHubPage({ params }: { params: IParams }) {
  const template = await getTemplate(Number(params.id));

  return <DetailPage template={template} />;
}
