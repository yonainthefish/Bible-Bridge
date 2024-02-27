import { getDoc, doc } from 'firebase/firestore';
import { appFireStore } from '@/firebase/config';

import useAuthContext from '@/hook/useAuthContext';

export default function useGetFeedData() {
  const { user } = useAuthContext();

  const getFeedData = async (feedId: string) => {
    if (user === null) {
      return;
    }

    try {
      const docSnap = await getDoc(doc(appFireStore, 'feed', feedId));

      return docSnap.data();
    } catch (error) {
      console.log(error);
    }
  };

  return getFeedData;
}
