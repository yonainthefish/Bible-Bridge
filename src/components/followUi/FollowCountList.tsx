import React from 'react';

import { ListProps, FeedItem } from '@/components/followUi/model';

const FollowCountList: React.FC<ListProps<FeedItem>> = ({
  userList,
  title,
}) => {
  return (
    <div>
      <h2 className="text-lg text-gray-600">{title}</h2>
      <p className="text-2xl font-bold">{userList.length}</p>
    </div>
  );
};

export default FollowCountList;
