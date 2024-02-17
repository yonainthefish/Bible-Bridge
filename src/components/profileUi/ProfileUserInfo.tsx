import { useEffect, useState } from 'react';
import { doc, getDoc, DocumentData } from 'firebase/firestore';
import { appFireStore } from '@/firebase/config';

import useAuthContext from '@/hook/useAuthContext';

import UserProfileImg from '@/assets/Img/Img-user.svg';

export default function ProfileUserInfo() {
  const { user } = useAuthContext();
  const [userDetails, setUserDetails] = useState<DocumentData | null>(null);

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

  if (!user) {
    return <div>Loading...</div>;
  }

  if (!userDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
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
        {userDetails.introduce || '소개글이 설정되지 않았습니다.'}
      </div>
    </div>
  );
}
