import React from 'react';
import { Button } from '@/components/ui/Button';
import UserProfileImg from '@/assets/Img/Img-user.svg';
import useAuthContext from '@/hook/useAuthContext';
import { useNavigate } from 'react-router-dom';

export default function ProfileCard() {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  console.log(user);

  if (!user) {
    navigate('/login');
    return;
  }

  return (
    <article className="w-[380px] h-[800px] px-[35px] py-[40px] rounded-md bg-gray-0 border-2 border-gray-200">
      <section className="">
        <img
          src={user.photoURL || UserProfileImg}
          alt="프로필 사진"
          className="mx-auto mb-6"
        />
        <div className="text-gray-700 text-nameSize font-bold">
          {user.displayName == null
            ? '사용자 이름을 찾을 수 없음'
            : user.displayName}
        </div>
        <div className="text-gray-600">{user.email}</div>
        <div className="max-h-20 my-4 line-clamp-3">
          {/* {user.introduce} */}
          소개글
        </div>
        <Button className="w-full">프로필 편집</Button>
      </section>
      <section id="followerBox" className="mt-12">
        <div className="bg-gray-50 py-5 rounded-md flex justify-around ">
          <div>
            <p className="text-smaller">팔로워</p>
            <p className="text-title mt-[-8px] font-bold">15</p>
          </div>
          <div>
            <p className="text-smaller">팔로워</p>
            <p className="text-title mt-[-8px] font-bold">15</p>
          </div>
        </div>
        <ul>
          <li>팔로워리스트</li>
        </ul>
      </section>
    </article>
  );
}
