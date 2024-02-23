import React from 'react';
import { Link } from 'react-router-dom';

import usePageContext from '@/hook/usePageContext';

import { FeedAndUserInfo } from '@/components/feedUi/model';
import DateFormatter from '@/components/commonUi/date/DateFomatter';
import Overlay from '@/components/commonUi/overlay/Overlay';
import Liked from '@/components/userReactionUi/likeUi/Liked';
import UserImgAndName from '@/components/profileUi/UserImgAndName';

import Calendar from '@/assets/Icon/Icon-calendar.svg';

interface FeedItemProps {
  feed: FeedAndUserInfo;
}

const FeedInfo: React.FC<FeedItemProps> = ({ feed }) => {
  const { setPrevPath } = usePageContext();

  const handleLinkClick = () => {
    setPrevPath(window.location.pathname);
  };

  return (
    <Link to={`/feed/${feed.id}`} onClick={handleLinkClick}>
      <div className="w-[100%] bg-white ">
        <UserImgAndName
          authorPhotoURL={feed.authorPhotoURL}
          authorDisplayName={feed.authorDisplayName}
        />

        <section className="aspect-square border-2 rounded-sm overflow-hidden relative">
          {feed.imageUrl && (
            <>
              <img
                src={feed.imageUrl}
                alt="Feed"
                className="w-full h-full object-cover object-center"
              />
              <Overlay />
            </>
          )}
          <div className="absolute-center text-gray-0 p-5">
            <h3 className="text-xl">제목: {feed.title}</h3>
            <p>{feed.text}</p>
          </div>
          <div className="absolute top-2 right-2 flex items-center gap-3">
            <Liked feedId={feed.id} />
          </div>
        </section>

        <div className="flex gap-1 text-gray-500 text-sm">
          <img src={Calendar} alt="달력" className="text-gray-700" />
          <DateFormatter date={feed.timestamp.toDate()} />
        </div>
      </div>
    </Link>
  );
};

export default FeedInfo;
