import React from 'react';
import { Link } from 'react-router-dom';
import useSetProfileImage from '../hook/useSetProfileImage';

import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Label } from '../components/ui/Label';

import ProfileImg from '../assets/Img/Img-user.svg';
import ProfileAddImg from '../assets/Icon/Icon-add-circle.svg';

export default function SignUp() {
  const { src, setProfileImage } = useSetProfileImage();

  const gradientStyle = {
    backgroundImage:
      'linear-gradient(113.78deg, rgba(250, 218, 128, 0.4) 21.18%, rgba(243, 117, 37, 0.4) 55.65%, rgba(237, 67, 35, 0.4) 82.73%)',
  };

  return (
    <div
      className="w-screen h-screen flex items-center justify-center "
      style={gradientStyle}
    >
      <section className="shadow-slate200 w-[600px]  px-[130px] py-[30px] bg-gray-1 transform translate-x-1/2-translate-y-1/2 rounded-lg flex flex-col items-center overflow-hidden">
        <h2 className="mx-auto mb-1 text-largeTitle">Sign up</h2>
        <Label
          htmlFor="profile-input"
          className="w-[110px] h-[110px] cursor-pointer mb-7 relative"
        >
          <div className="w-full h-full rounded-full overflow-hidden ">
            <img
              src={src || ProfileImg}
              alt="프로필 이미지 등록"
              className="object-cover w-full h-full"
            />
            <img
              src={ProfileAddImg}
              alt="변경하기"
              className="absolute bottom-0 right-0"
            />
          </div>
        </Label>
        <Input
          id="profile-input"
          type="file"
          className="sr-only"
          onChange={setProfileImage}
        />

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

          <Label htmlFor="password-check-input" className="sr-only">
            비밀번호 확인
          </Label>
          <Input
            type="password"
            id="password-check-input"
            placeholder="비밀번호 확인"
            required
          />

          <Label htmlFor="nickname-input" className="sr-only">
            닉네임
          </Label>
          <Input
            type="text"
            id="nickname-input"
            placeholder="닉네임"
            required
          />

          <Label htmlFor="introduce-input" className="sr-only">
            소개 성경 구절
          </Label>
          <Input
            type="text"
            id="introduce-input"
            placeholder="나의 힘이 되는 성경 구절을 적어 주세요"
          />
        </form>

        <Button type="submit">완료</Button>

        <div className="flex items-center gap-4  pt-7">
          <p className="text-gray-600 text-small ">이미 회원이세요?</p>
          <Link
            to="/login"
            className="font-bold text-gray-900 text-large hover:underline"
          >
            로그인하러 가기
          </Link>
        </div>
      </section>
    </div>
  );
}
