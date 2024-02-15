import { useState, useEffect } from 'react';
import { doc, getDoc, getFirestore } from 'firebase/firestore';

import useAuthContext from '@/hook/useAuthContext';

import UserList from '@/components/cardUi/UserList';
import { User } from '@/components/cardUi/model';

import UserImg from '@/assets/Img/Img-user.svg';

export default function UserProfile({ userId }: User) {
  const { user } = useAuthContext();
  const [followingList, setFollowingList] = useState<User[]>([]);
  const [followerList, setFollowerList] = useState<User[]>([]);
  const db = getFirestore();

  const fetchUserList = async (userIds: string[]): Promise<User[]> => {
    return Promise.all(
      userIds.map(async (id: string) => {
        const userDocSnap = await getDoc(doc(db, 'users', id));
        const User = userDocSnap.data() as User;
        return {
          userId: id,
          displayName: User.displayName || 'Unknown',
          photoURL: User.photoURL || UserImg,
        };
      }),
    );
  };

  useEffect(() => {
    const fetchUserLists = async () => {
      if (!userId) return;
      const userRef = doc(db, 'users', userId);
      const docSnap = await getDoc(userRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        const followingUserIds = data.followingList || [];
        const followerUserIds = data.followerList || [];

        const followingUsers = await fetchUserList(followingUserIds);
        const followerUsers = await fetchUserList(followerUserIds);

        setFollowingList(followingUsers);
        setFollowerList(followerUsers);
      }
    };

    fetchUserLists();
  }, [userId, db]);

  return (
    <div>
      {user?.uid === userId && (
        <>
          <UserList userList={followingList} title="팔로잉" />
          <UserList userList={followerList} title="팔로워" />
        </>
      )}
    </div>
  );
}
