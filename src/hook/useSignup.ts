import { useState } from 'react';
import { appFireStore, appAuth } from '@/firebase/config';
import { FirebaseError } from 'firebase/app';
import { doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

import { Props } from '@/hook/model';
import useAuthContext from '@/hook/useAuthContext';
import { uploadImg } from '@/utils/SDKUtils.ts';

export default function useSignup() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, setPending] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async ({
    email,
    password,
    displayName,
    file,
    introduce,
  }: Props) => {
    setError(null);
    setPending(true);

    try {
      const { user } = await createUserWithEmailAndPassword(
        appAuth,
        email,
        password,
      );

      interface Opt {
        displayName?: string;
        photoURL?: string;
        introduce?: string;
      }

      const opt: Opt = {};

      if (displayName !== null) {
        opt.displayName = displayName;
      }

      if (introduce !== null) {
        opt.introduce = introduce;
      }
      if (file !== null) {
        opt.photoURL = await uploadImg(`profile/${user.uid}`, file);
      }

      await updateProfile(user, opt);

      const userProfile = {
        displayName: opt.displayName || user.displayName,
        photoURL: opt.photoURL || user.photoURL,
        introduce: opt.introduce,
      };

      const userRef = doc(appFireStore, 'users', user.uid);
      await setDoc(userRef, userProfile);

      setError(null);
      dispatch({ type: 'login', payload: user });
    } catch (err) {
      if (err instanceof FirebaseError) {
        setError(err.code);
      } else if (err instanceof Error) {
        setError(err.message);
      }
    }

    setPending(false);
  };

  return { error, isPending, signup };
}
