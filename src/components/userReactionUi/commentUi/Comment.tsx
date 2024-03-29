import { useState } from 'react';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { appFireStore } from '@/firebase/config';

import useAuthContext from '@/hook/useAuthContext';
import { Input } from '@/components/commonUi/input/Input';

interface CommentProps {
  postId: string;
}

export default function Comment({ postId }: CommentProps) {
  const [commentText, setCommentText] = useState('');
  const { user } = useAuthContext();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCommentText(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!user) return;

    const commentData = {
      postId,
      text: commentText,
      createdAt: Timestamp.now(),
      userId: user.uid,
      displayName: user.displayName,
      authorPhotoURL: user.photoURL,
    };

    try {
      await addDoc(collection(appFireStore, 'comments'), commentData);
      console.log('댓글이 저장되었습니다.');
    } catch (error) {
      console.error('댓글 저장 중 에러 발생:', error);
    }

    setCommentText('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-[full] flex items-end border-t py-1"
    >
      <Input
        type="text"
        value={commentText}
        onChange={handleInputChange}
        placeholder="댓글을 입력하세요"
        className="mb-0 border-none"
      />
      <button type="submit" className="w-[50px] h-[40px]">
        게시
      </button>
    </form>
  );
}
