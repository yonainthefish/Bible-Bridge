import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { doc, getDoc, DocumentData } from 'firebase/firestore';
import { appFireStore } from '@/firebase/config';

import useAuthContext from '@/hook/useAuthContext';

import { Button } from '@/components/ui/button/Button';

import UserProfileImg from '@/assets/Img/Img-user.svg';

export default function ProfileCard() {
  const { user } = useAuthContext();
  const [userDetails, setUserDetails] = useState<DocumentData | null>(null);

  const navigate = useNavigate();
  console.log(user);

  const handleEditProfile = () => {
    navigate('/setting');
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (user) {
        const userRef = doc(appFireStore, 'users', user.uid);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          setUserDetails(docSnap.data());
        } else {
          console.log('No such document!');
        }
      }
    };

    fetchUserDetails();
  }, [user]);

  if (!user || !userDetails) {
    return <div>Loading...</div>;
  }

  return (
    <article className="w-[380px] h-[800px] px-[35px] py-[40px] rounded-md bg-gray-0 border-2 border-gray-200">
      <section className="">
        <img
          src={user.photoURL || UserProfileImg}
          alt="프로필 사진"
          className="w-[200px] mx-auto mb-6 rounded-full aspect-square object-cover"
        />
        <div className="text-gray-700 text-nameSize font-bold">
          {user.displayName == null
            ? '사용자 이름을 찾을 수 없음'
            : user.displayName}
        </div>
        <div className="text-gray-600">{user.email}</div>
        <div className="max-h-20 my-4 line-clamp-3">
          <div>{userDetails.introduce || '소개글이 설정되지 않았습니다.'}</div>
        </div>
        <Link to="/setting">
          <Button className="w-full" onClick={handleEditProfile}>
            프로필 편집
          </Button>
        </Link>
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
