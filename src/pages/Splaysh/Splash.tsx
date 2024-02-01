import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import useAuthContext from '@/hook/useAuthContext';

export default function Splash() {
  const navigate = useNavigate();
  const { isAuthReady } = useAuthContext();

  useEffect(() => {
    setTimeout(() => {
      if (isAuthReady) {
        navigate('/login');
      }
    }, 1700);
  }, [isAuthReady]);

  return <p>SPLASHㅗㅗㅗ</p>;
}
