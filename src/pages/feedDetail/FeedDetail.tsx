import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { appFireStore } from '@/firebase/config';
import { doc, getDoc } from 'firebase/firestore';

import { FeedItem as FeedItemType } from '@/components/cardUi/model';
import Comment from '@/components/userReactionUi/commentUi/Comment';
import CommentsList from '@/components/userReactionUi/commentUi/CommentList';
import FeedInfo from '@/components/cardUi/FeedInfo';

export default function FeedDetail() {
  const { id } = useParams<{ id: string }>();
  const [feed, setFeed] = useState<FeedItemType | null>(null);

  useEffect(() => {
    const fetchFeed = async () => {
      if (id) {
        const docRef = doc(appFireStore, 'feed', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setFeed({
            ...(docSnap.data() as FeedItemType),
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

  return (
    <section className="w-[70%] h-[80vh] mx-auto flex border-2 border-gray-700">
      <div className="flex-1">{feed && <FeedInfo feed={feed} />}</div>
      <div className="flex-1">
        <div className="h-[calc(100%-40px)] border-2 border-gray-300 overflow-y-auto">
          {id && <CommentsList postId={id} />}
        </div>
        {id && <Comment postId={id} />}
      </div>
    </section>
  );
}
