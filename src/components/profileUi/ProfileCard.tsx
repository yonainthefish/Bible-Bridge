import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { doc, getDoc, DocumentData } from 'firebase/firestore';
import { appFireStore } from '@/firebase/config';

import useAuthContext from '@/hook/useAuthContext';

import { User } from '@/components/profileUi/model';
import FollowUserList from '@/components/followUi/FollowUserList';
import { Button } from '@/components/commonUi/button/Button';
import FollowCountList from '@/components/followUi/FollowCountList';
import ProfileUserInfo from '@/components/profileUi/ProfileUserInfo';

export default function ProfileCard() {
  const { user } = useAuthContext();
  const [userDetails, setUserDetails] = useState<DocumentData | null>(null);
  const [selectedTab, setSelectedTab] = useState('followers');
  const navigate = useNavigate();

  const handleEditProfile = () => {
    navigate('/setting');
  };

  const fetchUserDetails = async () => {
    if (!user) return;

    const userRef = doc(appFireStore, 'users', user.uid);
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      const followers = await fetchUserInfo(data.followerList || []);
      const followings = await fetchUserInfo(data.followingList || []);

      setUserDetails({
        ...data,
        followerList: followers,
        followingList: followings,
      });
    } else {
      console.log('No such document!');
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, [user]);

  const fetchUserInfo = async (userIds: string[]): Promise<User[]> => {
    const users = await Promise.all(
      userIds.map(async (userId): Promise<User | null> => {
        const userRef = doc(appFireStore, 'users', userId);
        const userSnap = await getDoc(userRef);
        if (!userSnap.exists()) {
          return null;
        }
        const userData = userSnap.data() as User;
        return {
          userId: userId,
          displayName: userData.displayName || 'Unknown',
          photoURL: userData.photoURL || 'UserImg',
        };
      }),
    );

    return users.filter((user): user is User => user !== null);
  };

  const updateFollowLists = async () => {
    await fetchUserDetails();
  };

  if (!user || !userDetails) {
    return <div>Loading...</div>;
  }

  return (
    <article className="w-[380px] h-[800px] px-[35px] py-[40px] rounded-md bg-gray-0 border-2 border-gray-200">
      <ProfileUserInfo />

      <Link to="/setting">
        <Button className="w-full" onClick={handleEditProfile}>
          프로필 편집
        </Button>
      </Link>

      <section className="flex items-center justify-around border-2 my-7">
        <button onClick={() => setSelectedTab('followers')}>
          <FollowCountList
            userList={userDetails.followerList || []}
            title="Follower"
          />
        </button>
        <button onClick={() => setSelectedTab('following')}>
          <FollowCountList
            userList={userDetails.followingList || []}
            title="Following"
          />
        </button>
      </section>
      <section className="h-[250px] max-h-[250px] overflow-auto">
        {(() => {
          const list =
            selectedTab === 'followers'
              ? userDetails.followerList
              : userDetails.followingList;
          const emptyMessage =
            selectedTab === 'followers'
              ? '아직 팔로한 유저가 없습니다.'
              : '아직 팔로잉한 유저가 없습니다.';

          if (list && list.length > 0) {
            return (
              <FollowUserList
                userList={list}
                updateFollowLists={updateFollowLists}
              />
            );
          } else {
            return <p className="text-center">{emptyMessage}</p>;
          }
        })()}
      </section>
    </article>
  );
}
