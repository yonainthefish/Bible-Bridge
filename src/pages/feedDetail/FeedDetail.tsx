import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { appFireStore } from '@/firebase/config';
import { doc, getDoc, DocumentData } from 'firebase/firestore';

import useGetFeedData from '@/hook/useGetFeedDate';

import { FeedAndUserInfo } from '@/components/feedUi/model';
import Comment from '@/components/userReactionUi/commentUi/Comment';
import CommentsList from '@/components/userReactionUi/commentUi/CommentList';
import DateFormatter from '@/components/commonUi/date/DateFomatter';
import UserImgAndName from '@/components/profileUi/UserImgAndName';
import Liked from '@/components/userReactionUi/likeUi/Liked';
import Modal from '@/components/modalUi/SelectModal';
import DeleteFeedModal from '@/components/modalUi/DeleteFeedModal';

import SeeMore from '@/assets/Icon/Icon-More.svg';

export default function FeedDetail() {
  const { id } = useParams<{ id: string }>();
  const [feed, setFeed] = useState<FeedAndUserInfo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [feedData, setFeedData] = useState<DocumentData | null>(null);
  const getFeedData = useGetFeedData();

  useEffect(() => {
    (async () => {
      const feedData = await getFeedData(id);

      if (feedData) {
        setFeedData(feedData);
      } else {
        // setInvalidId(true);
      }
    })();
  }, []);

  useEffect(() => {
    const fetchFeed = async () => {
      if (id) {
        const docRef = doc(appFireStore, 'feed', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setFeed({
            ...(docSnap.data() as FeedAndUserInfo),
            id: docSnap.id,
          });
        }
      }
    };

    fetchFeed();
  }, [id]);

  if (!feed) {
    return <div>Loading...</div>;
  }

  const handleOpenModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDeleteCloseModal = () => {
    setDeleteModalOpen(false);
    setIsModalOpen(false);
  };

  // const feedId = id;

  return (
    <section className="w-[70%] h-[80vh] mx-auto flex border border-gray-100 rounded-sm overflow-hidden">
      <div className="flex-1">
        <div className="h-full bg-gray-900 flex justify-center items-center">
          {feed.imageUrl && (
            <img
              src={feed.imageUrl}
              alt="Feed"
              className="w-full object-cover object-center"
            />
          )}
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        <div className="flex justify-between border-b py-3 px-3">
          <UserImgAndName
            authorPhotoURL={feed.authorPhotoURL}
            authorDisplayName={feed.authorDisplayName}
          />
          <button type="button" onClick={handleOpenModal}>
            <img src={SeeMore} alt="더보기" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto text-left pl-4 pr-4 mt-2">
          <p className="font-bold">오늘의 묵상 : {feed.title}</p>
          <p style={{ whiteSpace: 'pre-wrap' }}>{feed.text}</p>
          <div className="mt-8">{id && <CommentsList postId={id} />}</div>
        </div>

        <div className="border-t py-2 pl-3 text-left">
          <Liked feedId={feed.id} />
          <DateFormatter date={feed.timestamp} />
        </div>
        {id && <Comment postId={id} />}
      </div>
      {isModalOpen && (
        <Modal
          setDeleteModalOpen={setDeleteModalOpen}
          onClose={handleCloseModal}
        />
      )}
      {deleteModalOpen && (
        <DeleteFeedModal
          onClose={handleDeleteCloseModal}
          imgUrlList={feedData?.imageUrl}
          feedId={id || 'defaultId'}
        />
      )}
    </section>
  );
}
