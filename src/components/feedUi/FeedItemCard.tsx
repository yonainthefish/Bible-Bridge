import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  collection,
  getDocs,
  getDoc,
  orderBy,
  query,
  DocumentData,
  doc,
} from 'firebase/firestore';
import { appFireStore } from '@/firebase/config';

import { FeedAndUserInfo } from '@/components/feedUi/model';
import FeedInfo from '@/components/feedUi/FeedInfo';
import Modal from '@/components/modalUi/SelectModal';
import DeleteFeedModal from '@/components/modalUi/DeleteFeedModal';

import useAuthContext from '@/hook/useAuthContext';
import useGetFeedData from '@/hook/useGetFeedDate';
import useEditContext from '@/hook/useEditContext';

export default function FeedItemCard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [feeds, setFeeds] = useState<FeedAndUserInfo[]>([]);
  const [feedData, setFeedData] = useState<DocumentData | null>(null);
  const { user } = useAuthContext();
  const { id } = useParams();
  const { isEditModalOpen } = useEditContext();
  const getFeedData = useGetFeedData();

  useEffect(() => {
    (async () => {
      const feedData = await getFeedData();

      if (feedData) {
        setFeedData(feedData);
      } else {
        // setInvalidId(true);
      }
    })();
  }, [isEditModalOpen]);

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

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDeleteCloseModal = () => {
    setDeleteModalOpen(false);
    setIsModalOpen(false);
  };

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

  // 날짜 포맷 함수
  // const formatDate = (timestamp: Timestamp) => {
  //   const date = timestamp.toDate();
  //   const formattedDate = `${date.getFullYear()}-${
  //     date.getMonth() + 1
  //   }-${date.getDate()}`;
  //   return formattedDate;
  // };

  return (
    <>
      <section className="flex flex-wrap gap-5">
        {feeds.map((feed) => (
          <FeedInfo key={feed.id} feed={feed} />
        ))}
      </section>

      {isModalOpen && (
        <Modal
          setDeleteModalOpen={setDeleteModalOpen}
          feedId={id || 'not found'}
          onClose={handleCloseModal}
        />
      )}
      {deleteModalOpen && (
        <DeleteFeedModal
          onClose={handleDeleteCloseModal}
          imgUrlList={feedData?.imageUrl || []}
        />
      )}
    </>
  );
}
