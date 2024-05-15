import TemplateHub from '@/components/TemplateHub';
import axios from 'axios';

async function getTemplates() {
  const { data } = await axios.get(
    `http://ec2-54-180-98-97.ap-northeast-2.compute.amazonaws.com:8000/templates`,
  );

  return data;
}

export default async function TemplateHubPage() {
  const templateList = await getTemplates();

  console.log(templateList);

  return <TemplateHub templates={templateList} />;
}
