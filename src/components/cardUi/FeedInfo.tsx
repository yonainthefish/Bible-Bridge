import React from 'react';
import { Link } from 'react-router-dom';
import { Timestamp } from 'firebase/firestore';

import usePageContext from '@/hook/usePageContext';
import { FeedItem as FeedItemType } from '@/components/cardUi/model';
import Overlay from '@/components/commonUi/overlay/Overlay';
import Liked from '@/components/userReactionUi/likeUi/Liked';

import BasicUserImg from '@/assets/Img/Img-user.svg';
import Calendar from '@/assets/Icon/Icon-calendar.svg';

interface FeedItemProps {
  feed: FeedItemType;
}

const FeedInfo: React.FC<FeedItemProps> = ({ feed }) => {
  const { setPrevPath } = usePageContext();

  const formatDate = (timestamp: Timestamp) => {
    const date = timestamp.toDate();
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  };

  const handleLinkClick = () => {
    setPrevPath(window.location.pathname);
  };

  return (
    <Link to={`/feed/${feed.id}`} onClick={handleLinkClick}>
      <div className="w-[240px] bg-white ">
        <div className="flex justify-between my-1 px-2">
          <div className="flex items-center gap-2">
            <img
              src={feed.authorPhotoURL || BasicUserImg}
              alt="User"
              className="h-9 w-9 rounded-full object-cover"
            />
            <p className="text-small">
              {feed.authorDisplayName || '알 수 없음'}
            </p>
          </div>
        </div>

        <section className="aspect-square border-2 rounded-lg overflow-hidden relative">
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
            <h3 className="text-xl">{feed.title}</h3>
            <p>{feed.text}</p>
          </div>
          <div className="absolute top-2 right-2 flex items-center gap-3">
            <Liked feedId={feed.id} />
          </div>
        </section>

        <div className="flex gap-1 text-gray-500 text-sm">
          <img src={Calendar} alt="달력" className="text-gray-700" />
          {formatDate(feed.timestamp)}
        </div>
      </div>
    </Link>
  );
};

export default FeedInfo;
