import React, { useState, useEffect } from 'react';
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from 'firebase/firestore';
import { appFireStore } from '@/firebase/config';

import DateFormatter from '@/components/commonUi/date/DateFomatter';

interface CommentType {
  id: string;
  text: string;
  createdAt: Date;
  userId: string;
}

interface CommentsListProps {
  postId: string;
}

const CommentsList: React.FC<CommentsListProps> = ({ postId }) => {
  const [comments, setComments] = useState<CommentType[]>([]);

  useEffect(() => {
    const q = query(
      collection(appFireStore, 'comments'),
      where('postId', '==', postId),
      orderBy('createdAt', 'desc'),
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const commentsData: CommentType[] = [];
      snapshot.forEach((doc) => {
        const commentData = doc.data() as CommentType;
        let createdAt: Date;
        if (
          'toDate' in commentData.createdAt &&
          typeof commentData.createdAt.toDate === 'function'
        ) {
          createdAt = commentData.createdAt.toDate();
        } else {
          // 'createdAt'가 이미 Date 객체이거나 변환할 필요가 없는 경우
          createdAt = new Date(commentData.createdAt);
        }

        commentsData.push({
          ...commentData,
          id: doc.id,
          createdAt,
        });
      });
      setComments(commentsData);
    });

    return () => unsubscribe();
  }, [postId]);

  console.log(comments);

  return (
    <div className="border-2 border-gray-200">
      {comments.map((comment) => (
        <div key={comment.id}>
          <p>{comment.userId}</p>
          <p>{comment.text}</p>

          <DateFormatter date={comment.createdAt} />
        </div>
      ))}
    </div>
  );
};

export default CommentsList;
