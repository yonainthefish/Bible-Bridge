import { doc, deleteDoc } from 'firebase/firestore';
import { appFireStore } from '@/firebase/config';

const useDeleteComment = () => {
  const deleteComment = async (commentId: string) => {
    try {
      await deleteDoc(doc(appFireStore, 'comments', commentId));
      console.log('댓글이 삭제되었습니다.');
    } catch (error) {
      console.error('댓글 삭제 중 오류 발생:', error);
    }
  };

  return deleteComment;
};

export default useDeleteComment;