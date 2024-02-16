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
import CommentEdit from '@/components/userReactionUi/commentUi/CommentEdit';

import seeMore from '@/assets/Icon/Icon-More.svg';
interface CommentType {
  id: string;
  text: string;
  createdAt: Date;
  userId: string;
  displayName: string;
}

interface ShowEditMenuState {
  [key: string]: boolean;
}

interface CommentsListProps {
  postId: string;
}

const CommentsList: React.FC<CommentsListProps> = ({ postId }) => {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [showEditMenu, setShowEditMenu] = useState<ShowEditMenuState>({});

  const toggleEditMenu = (commentId: string) => {
    setShowEditMenu((prevState) => ({
      ...prevState,
      [commentId]: !prevState[commentId],
    }));
  };

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
    <div className="w-[500px] p-2">
      {comments.map((comment) => (
        <div key={comment.id} className="mb-2 ">
          <div className="flex items-center justify-between relative">
            <div className="flex items-center">
              <p className="mr-2 text-small">{comment.displayName}</p>
              <DateFormatter date={comment.createdAt} />
            </div>

            <button onClick={() => toggleEditMenu(comment.id)}>
              <img src={seeMore} alt="더보기" />
            </button>

            {showEditMenu[comment.id] && (
              <CommentEdit
                commentId={comment.id}
                userId={comment.userId}
                originalText={comment.text}
              />
            )}
          </div>
          <p className="text-left">{comment.text}</p>
        </div>
      ))}
    </div>
  );
};

export default CommentsList;
