import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { appFireStore } from '@/firebase/config';
import { doc, getDoc } from 'firebase/firestore';

import { FeedAndUserInfo } from '@/components/feedUi/model';
import Comment from '@/components/userReactionUi/commentUi/Comment';
import CommentsList from '@/components/userReactionUi/commentUi/CommentList';
import DateFormatter from '@/components/commonUi/date/DateFomatter';
import UserImgAndName from '@/components/profileUi/UserImgAndName';
import Liked from '@/components/userReactionUi/likeUi/Liked';

export default function FeedDetail() {
  const { id } = useParams<{ id: string }>();
  const [feed, setFeed] = useState<FeedAndUserInfo | null>(null);

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

  console.log(feed);

  return (
    <section className="w-[70%] h-[80vh] mx-auto flex border border-gray-100 rounded-sm overflow-hidden">
      <div className="flex-1">
        {feed.imageUrl && (
          <img
            src={feed.imageUrl}
            alt="Feed"
            className="w-full object-cover object-center"
          />
        )}
      </div>
      <div className="flex-1 flex flex-col">
        <div className="border-b py-3 pl-3">
          <UserImgAndName
            authorPhotoURL={feed.authorPhotoURL}
            authorDisplayName={feed.authorDisplayName}
          />
        </div>
        <div className="flex-1 overflow-y-auto text-left pl-14 pr-3">
          <p>{feed.title}</p>
          <p>{feed.text}</p>
          <div className="mt-4">{id && <CommentsList postId={id} />}</div>
        </div>

        <div className="border-t py-2 pl-3 text-left">
          <Liked feedId={feed.id} />
          <DateFormatter date={feed.timestamp} />
        </div>
        {id && <Comment postId={id} />}
      </div>
    </section>
  );
}
