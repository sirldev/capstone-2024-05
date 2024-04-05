'use client';

import Typewriter from 'typewriter-effect';

export default function CommonTypeWriter() {
  return (
    <div className="absolute left-0 top-[-40px] w-[400px] rounded-lg p-2 text-[#2A2A2A]">
      <Typewriter
        options={{
          strings: [
            'MyMethod 메소드에 의존하는 MyApi API 배포 템플릿을 만들어줘.',
            'CloudFormation 템플릿에 네트워크 구성과 Amazon EC2 구성에 대한 파라미터 그룹을 정의해줘.',
          ],
          autoStart: true,
          loop: true,
          delay: 50,
        }}
      />
    </div>
  );
}
