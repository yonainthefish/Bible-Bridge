import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Label } from '../components/ui/Label';

import LogoImg from '../assets/Img/Logo-small.svg';
import LogoText from '../assets/Img/Logo-text-small.svg';
import googleIcon from '../assets/Img/Img-google.svg';
import githubIcon from '../assets/Img/Img-github.svg';
import kakaoIcon from '../assets/Img/Img-kakao.svg';

export default function LogIn() {
  const gradientStyle = {
    backgroundImage:
      'linear-gradient(113.78deg, rgba(250, 218, 128, 0.4) 21.18%, rgba(243, 117, 37, 0.4) 55.65%, rgba(237, 67, 35, 0.4) 82.73%)',
  };

  return (
    <div
      className="w-screen h-screen flex items-center justify-center "
      style={gradientStyle}
    >
      <section className="shadow-slate200 w-[600px] max-h-[800px] px-[130px] py-[50px] bg-gray-1 transform translate-x-1/2-translate-y-1/2 rounded-lg flex flex-col items-center overflow-hidden">
        <h1 className="mx-auto mb-6">
          <img
            className="mx-auto"
            src={LogoImg}
            alt="바이블브릿지 일러스트 로고"
          />
          <img src={LogoText} alt="바이블브릿지 텍스트 로고" />
        </h1>

        <form className="w-[100%]">
          <Label htmlFor="email-input" className="sr-only">
            이메일
          </Label>
          <Input type="email" id="email-input" placeholder="이메일" required />
          <Label htmlFor="password-input" className="sr-only">
            비밀번호
          </Label>
          <Input
            type="password"
            id="password-input"
            placeholder="비밀번호"
            required
          />
        </form>

        <Button type="submit">로그인</Button>

        <p className="w-[100%] mt-12 text-basic text-gray-600 bg-gray-basic-700">
          간편 로그인
        </p>
        <div className="flex gap-5 m-5">
          <a href="">
            <img
              className="w-[52px]"
              src={googleIcon}
              alt="구글 계정으로 로그인"
            />
          </a>
          <a href="">
            <img
              className="w-[52px]"
              src={githubIcon}
              alt="깃헙 계정으로 로그인"
            />
          </a>
          <a href="">
            <img
              className="w-[52px]"
              src={kakaoIcon}
              alt="카카오 계정으로 로그인"
            />
          </a>
        </div>

        <div className="flex items-center gap-4">
          <p className="text-gray-600 text-small ">아직 회원이 아니세요?</p>
          <Link
            to="/signup"
            className="font-bold text-gray-900 text-large hover:underline"
          >
            회원가입 하기
          </Link>
        </div>
      </section>
    </div>
  );
}
