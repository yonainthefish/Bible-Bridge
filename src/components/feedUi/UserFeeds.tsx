import { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { appFireStore } from '@/firebase/config';

import { FeedAndUserInfo } from '@/components/feedUi/model';
import FeedInfo from '@/components/feedUi/FeedInfo';

interface UserFeedsProps {
  userId?: string;
}

const UserFeeds = ({ userId }: UserFeedsProps) => {
  const [feeds, setFeeds] = useState<FeedAndUserInfo[]>([]);

  useEffect(() => {
    const fetchFeeds = async () => {
      if (!userId) return;

      const q = query(
        collection(appFireStore, 'feed'),
        where('userId', '==', userId),
      );
      const querySnapshot = await getDocs(q);
      const fetchedFeeds: FeedAndUserInfo[] = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        const timestamp = data.timestamp?.toDate
          ? data.timestamp.toDate()
          : data.timestamp;
        return {
          id: doc.id,
          title: data.title,
          text: data.text,
          timestamp,
          userId: data.userId,
          authorDisplayName: data.authorDisplayName,
          authorPhotoURL: data.authorPhotoURL,
          imageUrl: data.imgUrl,
        };
      });

      console.log(fetchedFeeds);
      setFeeds(fetchedFeeds);
    };

    fetchFeeds();
  }, [userId]);

  return (
    <div className="flex flex-wrap items-center  gap-5">
      {feeds.length > 0 ? (
        feeds.map((feed) => (
          <div className="w-[240px]">
            <FeedInfo key={feed.id} feed={feed} />
          </div>
        ))
      ) : (
        <p>아직 업로드한 게시물이 없습니다.</p>
      )}
    </div>
  );
};

export default UserFeeds;
