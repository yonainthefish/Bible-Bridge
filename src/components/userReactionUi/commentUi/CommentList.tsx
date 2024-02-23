import React, { useState, useEffect } from 'react';
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from 'firebase/firestore';
import { appFireStore } from '@/firebase/config';
import UserImgAndName from '@/components/profileUi/UserImgAndName';
import DateFormatter from '@/components/commonUi/date/DateFomatter';
import CommentEdit from '@/components/userReactionUi/commentUi/CommentEdit';

import seeMore from '@/assets/Icon/Icon-More.svg';
interface CommentType {
  id: string;
  text: string;
  createdAt: Date;
  userId: string;
  displayName: string;
  authorPhotoURL?: string;
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
      orderBy('createdAt'),
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const commentsData = snapshot.docs.map((doc) => {
        const commentData = doc.data() as CommentType;
        const createdAt = commentData.createdAt
          ? commentData.createdAt
          : new Date();
        return { ...commentData, id: doc.id, createdAt };
      });
      setComments(commentsData);
    });

    return () => unsubscribe();
  }, [postId]);

  console.log(comments);

  return (
    <section className="w-full border">
      {comments.map((comment) => (
        <section key={comment.id} className="mb-2 border">
          <div className="flex justify-between relative">
            <div className="flex items-center">
              <UserImgAndName
                authorPhotoURL={comment.authorPhotoURL}
                authorDisplayName={comment.displayName}
              />
              <p className="text-left ml-2">{comment.text}</p>
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
          <DateFormatter date={comment.createdAt} />
        </section>
      ))}
    </section>
  );
};

export default CommentsList;
