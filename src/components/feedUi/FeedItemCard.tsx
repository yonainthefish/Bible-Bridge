import { useState, useEffect } from 'react';
import {
  collection,
  getDocs,
  getDoc,
  orderBy,
  query,
  doc,
} from 'firebase/firestore';
import { appFireStore } from '@/firebase/config';

import { FeedAndUserInfo } from '@/components/feedUi/model';
import FeedInfo from '@/components/feedUi/FeedInfo';

import useAuthContext from '@/hook/useAuthContext';

export default function FeedItemCard() {
  const [feeds, setFeeds] = useState<FeedAndUserInfo[]>([]);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchFeeds = async () => {
      if (user) {
        try {
          const q = query(
            collection(appFireStore, 'feed'),
            orderBy('timestamp', 'desc'),
          );
          const querySnapshot = await getDocs(q);
          const FeedAndUserInfo = await Promise.all(
            querySnapshot.docs.map(async (doc) => {
              const data = doc.data() as FeedAndUserInfo;
              const userInfo = await getUserInfo(data.userId);
              return {
                id: doc.id,
                title: data.title,
                text: data.text,
                timestamp: data.timestamp,
                imageUrl: data.imageUrl,
                userId: data.userId,
                authorPhotoURL: userInfo?.photoURL,
                authorDisplayName: userInfo?.displayName,
              };
            }),
          );
          setFeeds(FeedAndUserInfo);
        } catch (err) {
          console.error('Error fetching feeds: ', err);
        }
      }
    };

    fetchFeeds();
  }, [user]);

  const getUserInfo = async (userId: string) => {
    const userRef = doc(appFireStore, 'users', userId);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      return userSnap.data();
    } else {
      console.log('유저 정보가 없습니다.');
      return null;
    }
  };

  return (
    <>
      <section className="flex flex-wrap items-center  gap-5">
        {feeds.map((feed) => (
          <FeedInfo key={feed.id} feed={feed} />
        ))}
      </section>
    </>
  );
}
