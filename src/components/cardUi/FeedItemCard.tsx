import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Timestamp,
  collection,
  getDocs,
  getDoc,
  orderBy,
  query,
  DocumentData,
  doc,
} from 'firebase/firestore';
import { appFireStore } from '@/firebase/config';

import useAuthContext from '@/hook/useAuthContext';
import useGetFeedData from '@/hook/useGetFeedDate';
import useEditContext from '@/hook/useEditContext';

import Overlay from '@/components/ui/overlay/Overlay';
import Modal from '@/components/modalUi/SelectModal';
import DeleteFeedModal from '@/components/modalUi/DeleteFeedModal';

import Calendar from '@/assets/Icon/Icon-calendar.svg';
import SeeMore from '@/assets/Icon/Icon-More.svg';
import BasicUserImg from '@/assets/Img/Img-user.svg';

interface FeedItem {
  id: string;
  title: string;
  text: string;
  timestamp: Timestamp;
  imageUrl?: string;
  userId?: string | undefined; // ��성자 ID
  authorPhotoURL?: string; // 작성자 프로필 사진 URL
  authorDisplayName?: string; // 작성자 이름
}

export default function FeedItemCard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [feeds, setFeeds] = useState<FeedItem[]>([]);
  const { user } = useAuthContext();
  const { id } = useParams();
  // const [time, setTime] = useState('');
  // const [InvalidId, setInvalidId] = useState(false);
  const [feedData, setFeedData] = useState<DocumentData | null>(null);
  const getFeedData = useGetFeedData();
  const { isEditModalOpen } = useEditContext();

  const handleSeeMoreClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDeleteCloseModal = () => {
    setDeleteModalOpen(false);
    setIsModalOpen(false);
  };

  useEffect(() => {
    (async () => {
      const feedData = await getFeedData();

      if (feedData) {
        setFeedData(feedData);

        // const date = new Date(feedData.timestamp.toDate());
        // const time = new Date(date.setHours(date.getHours() + 9))
        //   .toISOString()
        //   .slice(0, 10);

        // setTime(time);
      } else {
        // setInvalidId(true);
      }
    })();
  }, [isEditModalOpen]);

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

  useEffect(() => {
    const fetchFeeds = async () => {
      if (user) {
        try {
          const q = query(
            collection(appFireStore, 'feed'),
            orderBy('timestamp', 'desc'),
          );
          const querySnapshot = await getDocs(q);
          const feedList = await Promise.all(
            querySnapshot.docs.map(async (doc) => {
              const data = doc.data() as FeedItem;
              const userInfo = await getUserInfo(data.userId); // 사용자 정보 조회
              return {
                id: doc.id,
                title: data.title,
                text: data.text,
                timestamp: data.timestamp,
                imageUrl: data.imageUrl,
                authorPhotoURL: userInfo?.photoURL, // 작성자 프로필 사진 URL
                authorDisplayName: userInfo?.displayName, // 작성자 이름
                userId: data.userId, // 게시물에 저장된 userId 포함
              };
            }),
          );
          setFeeds(feedList);
        } catch (err) {
          console.error('Error fetching feeds: ', err);
        }
      }
    };

    fetchFeeds();
  }, [user]);

  // 날짜 포맷 함수
  const formatDate = (timestamp: Timestamp) => {
    const date = timestamp.toDate();
    const formattedDate = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}`;
    return formattedDate;
  };

  return (
    <>
      <section className="flex flex-wrap gap-5">
        {feeds.map((feed) => (
          <div className="w-[240px] bg-white" key={feed.id}>
            {/* <div key={feed.id}> */}
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
              <button
                className="more"
                type="button"
                onClick={handleSeeMoreClick}
              >
                <img src={SeeMore} alt="더보기" />
              </button>
              {/* </div> */}
            </div>
            <section className="aspect-square border-2 rounded-lg overflow-hidden relative">
              {feed.imageUrl && (
                <>
                  <img
                    src={feed.imageUrl}
                    alt="Feed"
                    className="w-full h-full object-cover object-center "
                  />
                  <Overlay />
                </>
              )}
              <div className="absolute-center text-gray-0 p-5">
                <h3 className="text-xl">{feed.title}</h3>
                <p className="">{feed.text}</p>
              </div>
            </section>
            <div className="flex gap-1 text-gray-500 text-sm ">
              <img src={Calendar} alt="달력" className="text-gray-700" />
              {formatDate(feed.timestamp)}
            </div>
          </div>
        ))}
      </section>

      {isModalOpen && (
        <Modal
          setDeleteModalOpen={setDeleteModalOpen}
          feedId={id}
          onClose={handleCloseModal}
        />
      )}
      {deleteModalOpen && (
        <DeleteFeedModal
          onClose={handleDeleteCloseModal}
          imgUrlList={feedData.imageUrl}
        />
      )}
    </>
  );
}
