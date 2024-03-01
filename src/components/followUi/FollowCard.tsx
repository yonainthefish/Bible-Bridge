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

import { FollowCardProps } from '@/components/followUi/model';
import { Button } from '@/components/commonUi/button/Button';

import BasicUserImg from '@/assets/Img/Img-user.svg';

export default function FollowCard({
  userId,
  displayName,
  photoURL,
  updateFollowLists,
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

    try {
      if (isFollowing) {
        // 언팔로우 로직
        await updateDoc(userRef, {
          followingList: arrayRemove(userId),
        });
        await updateDoc(targetUserRef, {
          followerList: arrayRemove(user.uid),
        });
        setIsFollowing(false);
      } else {
        // 팔로우 로직
        await updateDoc(userRef, {
          followingList: arrayUnion(userId),
        });
        await updateDoc(targetUserRef, {
          followerList: arrayUnion(user.uid),
        });
        setIsFollowing(true);
      }

      if (updateFollowLists) {
        updateFollowLists();
      }
    } catch (error) {
      console.error('Error updating follow status', error);
    }
  };

  return (
    <div className="flex items-center justify-between my-2">
      <div className="flex items-center">
        <img
          src={photoURL || BasicUserImg}
          alt="User"
          className="h-9 w-9 rounded-full object-cover"
        />
        <p className="ml-2 text-left">{displayName || 'unKnown User'}</p>
      </div>
      {user?.uid !== userId && (
        <Button
          onClick={handleFollow}
          variant={isFollowing ? 'outline' : 'default'}
          className="w-[20%]"
        >
          {isFollowing ? '언팔로우' : '팔로우'}
        </Button>
      )}
    </div>
  );
}
