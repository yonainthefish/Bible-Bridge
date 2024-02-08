import { useNavigate, useParams } from 'react-router-dom';
import { appFireStore } from '@/firebase/config';
import { doc, deleteDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

import useAuthContext from '@/hook/useAuthContext';
// import { useRemoveFeedIdFromFeedList } from '@/hook/useUpdateFeedList';

import { deleteImg } from '@/utils/SDKUtils';
import AlertModal from '@/components/modalUi/AlertModal';

export default function DeleteFeedModal({
  onClose,
  imgUrlList,
}: {
  onClose: () => void;
  imgUrlList: string[];
}) {
  //   const getSavedAlbumList = useGetSavedAlbumList();
  //   const removeFeedIdFromFeedList = useRemoveFeedIdFromFeedList();
  const navigate = useNavigate();

  const { id } = useParams();
  const { user } = useAuthContext();

  if (!id) {
    return;
  }

  const handleDeletePost = async () => {
    if (user) {
      const id = uuidv4();
      const postDocRef = doc(appFireStore, 'feed', id);

      try {
        await deleteDoc(postDocRef);

        imgUrlList.forEach(async (url) => await deleteImg(url));

        navigate(-1);
      } catch (error) {
        console.error('게시글 삭제 오류:', error);
      }
    } else {
      console.error('사용자가 로그인되지 않았습니다.');
    }
  };

  return (
    <AlertModal
      onClose={onClose}
      handleAgreeBtn={() => {
        (async () => {
          await handleDeletePost();
        })();
      }}
      title="게시물을 삭제하시겠습니까?"
      btnNameList={['아니요', '예']}
    />
  );
}
