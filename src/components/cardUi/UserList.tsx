import React from 'react';

import FollowCard from '@/components/cardUi/FollowCard';
import { UserListProps } from '@/components/cardUi/model';

const UserList: React.FC<UserListProps> = ({ userList, title }) => {
  return (
    <>
      <h2>{title}</h2>
      {userList.length}
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

export default UserList;
