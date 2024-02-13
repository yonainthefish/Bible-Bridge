import { useState, useEffect } from 'react';
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getFirestore,
  getDoc,
} from 'firebase/firestore';

import useAuthContext from '@/hook/useAuthContext';

import { Button } from '@/components/commonUi/button/Button';
import { FollowCardProps } from '@/components/cardUi/Model';

import BasicUserImg from '@/assets/Img/Img-user.svg';

export default function FollowCard({
  userId,
  displayName,
  photoURL,
}: FollowCardProps) {
  const { user } = useAuthContext();
  const [isFollowing, setIsFollowing] = useState(false);
  const db = getFirestore();

  useEffect(() => {
    const checkFollowingStatus = async () => {
      if (!user) return;

      const targetUserRef = doc(db, 'users', userId);
      const docSnap = await getDoc(targetUserRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        const isCurrentlyFollowing =
          data.followerList?.includes(user.uid) ?? false;
        setIsFollowing(isCurrentlyFollowing);
      }
    };

    checkFollowingStatus();
  }, [user, userId, db]);

  const handleFollow = async () => {
    if (!user) return;

    const userRef = doc(db, 'users', user.uid);
    const targetUserRef = doc(db, 'users', userId);

    if (isFollowing) {
      // 이미 팔로우 중이라면 팔로우 취소
      await updateDoc(userRef, {
        followingList: arrayRemove(userId),
      });
      await updateDoc(targetUserRef, {
        followerList: arrayRemove(user.uid),
      });
      setIsFollowing(false);
    } else {
      // 팔로우하지 않았다면 팔로우 추가
      await updateDoc(userRef, {
        followingList: arrayUnion(userId),
      });
      await updateDoc(targetUserRef, {
        followerList: arrayUnion(user.uid),
      });
      setIsFollowing(true);
    }
  };

  return (
    <div className="flex items-center justify-between border-2 my-1">
      <div className="flex items-center">
        <img
          src={photoURL || BasicUserImg}
          alt="User"
          className="h-9 w-9 rounded-full object-cover"
        />
        <p>{displayName || '알 수 없음'}</p>
      </div>
      {user?.uid !== userId && (
        <Button onClick={handleFollow}>
          {isFollowing ? '언팔로우' : '팔로우'}
        </Button>
      )}
    </div>
  );
}
