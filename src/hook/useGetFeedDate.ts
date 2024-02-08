import { getDoc, doc } from 'firebase/firestore';

import useAuthContext from '@/hook/useAuthContext';

import { appFireStore } from '@/firebase/config';

import { v4 as uuidv4 } from 'uuid';
export default function useGetFeedData() {
  const { user } = useAuthContext();

  const getFeedData = async () => {
    if (user === null) {
      return;
    }

    try {
      const id = uuidv4();
      const docSnap = await getDoc(doc(appFireStore, 'feed', id));

      return docSnap.data();
    } catch (error) {
      console.log(error);
    }
  };

  return getFeedData;
}
