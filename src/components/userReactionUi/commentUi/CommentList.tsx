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

interface CommentsListProps {
  postId: string;
}

const CommentsList: React.FC<CommentsListProps> = ({ postId }) => {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [activeCommentEdit, setActiveCommentEdit] = useState<string | null>(
    null,
  );

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

  const handleCloseModal = () => {
    setActiveCommentEdit(null);
  };

  return (
    <section className="w-full">
      {comments.map((comment) => (
        <section key={comment.id} className="mb-3 w-full">
          <div className="flex justify-between relative items-start">
            <div className="flex items-start flex-shrink-0">
              <p
                className="text-left ml-2 flex-grow"
                style={{ maxWidth: '360px', wordWrap: 'break-word' }}
              >
                <UserImgAndName
                  authorPhotoURL={comment.authorPhotoURL}
                  authorDisplayName={comment.displayName}
                />

                {comment.text}
                <div className="mt-[-6px]">
                  <DateFormatter date={comment.createdAt} />
                </div>
              </p>
            </div>

            <button
              onClick={() => setActiveCommentEdit(comment.id)}
              className="flex-shrink-0"
            >
              <img src={seeMore} alt="더보기" />
            </button>
          </div>

          {activeCommentEdit === comment.id && (
            <CommentEdit
              commentId={comment.id}
              userId={comment.userId}
              originalText={comment.text}
              onClose={handleCloseModal}
            />
          )}
        </section>
      ))}
    </section>
  );
};

export default CommentsList;
