import { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
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
      createdAt: serverTimestamp(),
      userId: user.uid,
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
    <form onSubmit={handleSubmit}>
      <Input
        type="text"
        value={commentText}
        onChange={handleInputChange}
        placeholder="댓글을 입력하세요..."
      />
      <button type="submit">제출</button>
    </form>
  );
}
