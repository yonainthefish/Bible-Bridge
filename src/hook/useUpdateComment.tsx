// hooks/useUpdateComment.js
import { doc, updateDoc } from 'firebase/firestore';
import { appFireStore } from '@/firebase/config';

const useUpdateComment = () => {
  const updateComment = async (
    commentId: string,
    newText: string,
  ): Promise<void> => {
    const commentRef = doc(appFireStore, 'comments', commentId);
    try {
      await updateDoc(commentRef, {
        text: newText,
      });
      console.log('댓글이 성공적으로 업데이트 되었습니다.');
    } catch (error) {
      console.error('댓글 업데이트 중 오류 발생:', error);
    }
  };

  return updateComment;
};

export default useUpdateComment;
