import React from 'react';
import FooterLogo from '@/assets/Img/Logo-text-small-gray.svg';
import GithubGray from '@/assets/Img/Img-github-gray.svg';

export default function Footer() {
  const handleGithubClick = () => {
    window.open('https://github.com/yonainthefish/Bible-Bridge', '_blank');
  };

  return (
    <>
      <footer className="bg-gray-100 w-full py-8 px-16 fixed bottom-0 z-20">
        <div className="flex justify-between">
          <img className="w-[250px]" src={FooterLogo} alt="바이블브릿지 로고" />
          <img
            className="w-10 cursor-pointer"
            src={GithubGray}
            alt="깃허브 바로가기"
            onClick={handleGithubClick}
          />
        </div>
      </footer>
    </>
  );
}
