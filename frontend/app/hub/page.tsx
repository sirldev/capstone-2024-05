import TemplateHub from '@/components/TemplateHub';
import axios from 'axios';

async function getTemplates() {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/templates`,
  );

  return data;
}

export default async function TemplateHubPage() {
  const templateList = await getTemplates();

  return <TemplateHub templates={templateList} />;
}
