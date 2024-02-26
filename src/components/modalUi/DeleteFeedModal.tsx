import { useNavigate } from 'react-router-dom';
import { appFireStore } from '@/firebase/config';
import { doc, deleteDoc } from 'firebase/firestore';

import useAuthContext from '@/hook/useAuthContext';

import { deleteImg } from '@/utils/SDKUtils';
import AlertModal from '@/components/modalUi/AlertModal';


export default function DeleteFeedModal({
  onClose,
  imgUrlList,
  feedId,
}: {
  onClose: () => void;
  imgUrlList: string;
  feedId: string;
}) {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const handleDeletePost = async () => {
    if (user && feedId) {
      const postDocRef = doc(appFireStore, 'feed', feedId);

      try {
        await deleteDoc(postDocRef);
        if (imgUrlList) {
          await deleteImg(imgUrlList);
        }
        navigate('/home');
        onClose();
      } catch (error) {
        console.error('게시글 삭제 오류:', error);
        onClose();
      }
    } else {
      console.error('사용자가 로그인되지 않았습니다.');
    }
  };

  return (
    <AlertModal
      onClose={onClose}
      handleAgreeBtn={handleDeletePost}
      title="게시물을 삭제하시겠습니까?"
      btnNameList={['아니요', '예']}
    />
  );
}
