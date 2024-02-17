import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { doc, getDoc, DocumentData } from 'firebase/firestore';
import { appFireStore } from '@/firebase/config';

import useAuthContext from '@/hook/useAuthContext';

import FollowList from '@/components/followUi/FollowList';
import { Button } from '@/components/commonUi/button/Button';
import FollowCountList from '@/components/followUi/FollowCountList';
import ProfileUserInfo from '@/components/profileUi/ProfileUserInfo';

export default function ProfileCard() {
  const { user } = useAuthContext();
  const [userDetails, setUserDetails] = useState<DocumentData | null>(null);

  const navigate = useNavigate();

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
      <ProfileUserInfo />

      <Link to="/setting">
        <Button className="w-full" onClick={handleEditProfile}>
          프로필 편집
        </Button>
      </Link>

      <section className="flex items-center justify-around border-2 my-7">
        <FollowCountList
          userList={userDetails.followingList || []}
          title="Follower"
        />
        <FollowCountList
          userList={userDetails.followerList || []}
          title="Following"
        />
      </section>

      {user && (
        <FollowList
          userId={user.uid}
          displayName={user.displayName || 'Unknown User'}
        />
      )}
    </article>
  );
}
