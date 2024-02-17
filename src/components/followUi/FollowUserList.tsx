import React from 'react';

import { ListProps, User } from '@/components/followUi/model';
import FollowCard from '@/components/followUi/FollowCard';

const FollowUserList: React.FC<ListProps<User>> = ({ userList }) => {
  return (
    <>
      {userList.map(({ userId, displayName, photoURL }) => (
        <FollowCard
          key={userId}
          userId={userId}
          displayName={displayName}
          photoURL={photoURL}
        />
      ))}
    </>
  );
};

export default FollowUserList;
