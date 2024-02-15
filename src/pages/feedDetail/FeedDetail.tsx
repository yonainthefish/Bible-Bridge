import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { appFireStore } from '@/firebase/config';
import { doc, getDoc } from 'firebase/firestore';

import Comment from '@/components/userReactionUi/commentUi/Comment';
import CommentsList from '@/components/userReactionUi/commentUi/CommentList';
import { FeedItem as FeedItemType } from '@/components/cardUi/model';
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
    <>
      {feed && <FeedInfo feed={feed} />}
      {id && <Comment postId={id} />}
      {id && <CommentsList postId={id} />}
    </>
  );
}
