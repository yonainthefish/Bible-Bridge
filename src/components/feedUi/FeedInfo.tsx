import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DocumentData } from 'firebase/firestore';

import usePageContext from '@/hook/usePageContext';
import useGetFeedData from '@/hook/useGetFeedDate';

import { FeedAndUserInfo } from '@/components/feedUi/model';
import DateFormatter from '@/components/commonUi/date/DateFomatter';
import Liked from '@/components/userReactionUi/likeUi/Liked';
import UserImgAndName from '@/components/profileUi/UserImgAndName';
import Modal from '@/components/modalUi/SelectModal';
import DeleteFeedModal from '@/components/modalUi/DeleteFeedModal';

import Calendar from '@/assets/Icon/Icon-calendar.svg';
import SeeMore from '@/assets/Icon/Icon-More.svg';
interface FeedItemProps {
  feed: FeedAndUserInfo;
}

const FeedInfo: React.FC<FeedItemProps> = ({ feed }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [feedData, setFeedData] = useState<DocumentData | null>(null);
  const { setPrevPath } = usePageContext();
  const getFeedData = useGetFeedData();
  const navigate = useNavigate();
  // const { id } = useParams();

  useEffect(() => {
    (async () => {
      if (!feed.id) {
        return;
      }
      const feedData = await getFeedData(feed.id);

      if (feedData) {
        setFeedData(feedData);
      }
    })();
  }, [feed.id, getFeedData]);

  const formattedDate = feed.timestamp?.toDate
    ? feed.timestamp.toDate()
    : feed.timestamp;

  const handleLinkClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();

    if (!isModalOpen && !deleteModalOpen) {
      setPrevPath(window.location.pathname);
      navigate(`/feed/${feed.id}`);
    }
  };

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

  return (
    <div
      onClick={handleLinkClick}
      className="w-[100%] bg-white cursor-pointer "
    >
      <div className="w-[100%] bg-white">
        <div className="flex justify-between">
          <UserImgAndName
            authorPhotoURL={feed.authorPhotoURL}
            authorDisplayName={feed.authorDisplayName}
          />
          <button type="button" onClick={handleOpenModal} className="px-2">
            <img src={SeeMore} alt="더보기" />
          </button>
        </div>

        <section className="aspect-square rounded-sm overflow-hidden relative ">
          {feed.imageUrl && (
            <>
              <img
                src={feed.imageUrl}
                alt="Feed"
                className="w-full h-full object-cover object-center "
              />
              <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50"></div>
            </>
          )}
          <div className="absolute-center text-gray-0 p-5">
            <h3 className="text-xl">제목: {feed.title}</h3>
            <p>{feed.text}</p>
          </div>
          <div className="absolute top-2 right-2 flex items-center gap-3">
            <Liked feedId={feed.id} color="white" />
          </div>
        </section>

        <div className="flex items-center gap-1 text-gray-500 text-sm">
          <img src={Calendar} alt="달력" className="text-gray-700" />
          <DateFormatter date={formattedDate} />
        </div>
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
          feedId={feed.id || 'defaultId'}
        />
      )}
    </div>
  );
};

export default FeedInfo;
