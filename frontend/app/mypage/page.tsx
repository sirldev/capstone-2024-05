'use client'
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import MyTemplates from '@/components/MyTemplates';

// async function getMyTemplates() {
//   const router = useRouter();
//   const { isLoggedIn, accessToken } = useAuth();

//   if (accessToken == null || !isLoggedIn) {
//     router.push('/login');
//     return
//   }

//   const config: { headers: { Authorization?: string } } = {
//     headers: {}
//   };

//   const token = accessToken;
//   config.headers['Authorization'] = `${token}`;

//   try {
//     const { data } = await axios.get(
//       `${process.env.NEXT_PUBLIC_API_BASE_URL}/templates`,
//       config
//     );
//     return data;
//   } catch (error:any) {
//     // if (error.response && error.response.status === 401) {
//     //   router.push('/login');
//     // } else {
//       router.push('/login');
//     // }
//   }
// }

// export default async function MyPage() {
//   const templateList = await getMyTemplates();

//   console.log(templateList);

//   return <TemplateHub templates={templateList} />;
// }


export default function MyPage() {
  const [templateList, setTemplateList] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { isLoggedIn, accessToken } = useAuth();

  useEffect(() => {
    const fetchTemplates = async () => {
      if (accessToken == null || !isLoggedIn) {
        router.push('/login');
        return;
      }

      const config = {
        headers: {
          Authorization: `${accessToken}`
        }
      };

      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/templates`,
          config
        );
        console.log(data);
        setTemplateList(data);
        setLoading(false);
      } catch (error) {
        router.push('/login');
      }
    };

    fetchTemplates();
  }, [accessToken, isLoggedIn, router]);

  if (loading) {
    return <div></div>;
  }

  return <MyTemplates templates={templateList} />;
};