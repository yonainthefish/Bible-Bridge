import { useEffect, useState } from 'react';
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
} from 'firebase/firestore';
import { db } from '@/firebase/config';
import useAuthContext from '@/hook/useAuthContext';

import LikedIcon from '@/assets/Icon/Icon-heart-active.svg';
import unLikedIcon from '@/assets/Icon/Icon-heart.svg';

interface LikeButtonProps {
  feedId: string;
}

export default function LikeButton({ feedId }: LikeButtonProps) {
  const { user } = useAuthContext();
  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const fetchLikes = async () => {
      const docRef = doc(db, 'feed', feedId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const likesArray = docSnap.data().likes || [];
        setLikeCount(likesArray.length);
        setIsLiked(likesArray.includes(user?.uid));
      }
    };

    fetchLikes();
  }, [feedId, user]);

  const handleLike = async () => {
    if (!user) {
      alert('로그인이 필요합니다.');
      return;
    }

    const postRef = doc(db, 'feed', feedId);

    if (isLiked) {
      await updateDoc(postRef, {
        likes: arrayRemove(user.uid),
      });
    } else {
      await updateDoc(postRef, {
        likes: arrayUnion(user.uid),
      });
    }

    setIsLiked(!isLiked);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  return (
    <button
      onClick={handleLike}
      className="flex items-center gap-1 text-gray-1"
    >
      {likeCount}
      <img
        src={isLiked ? LikedIcon : unLikedIcon}
        alt="like"
        className="w-[25px]"
      />
    </button>
  );
}