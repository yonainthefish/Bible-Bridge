import { useEffect, useState } from 'react';

import '@/components/commonUi/topButton/TopButton.css';

import ArrowTop from '@/assets/Icon/Icon-upBtn.svg';

export default function TopButton() {
  const [ScrollY, setScrollY] = useState(0);
  const [BtnStatus, setBtnStatus] = useState(false);

  const handleFollow = () => {
    setScrollY(window.pageYOffset);
    if (ScrollY > 100) {
      setBtnStatus(true);
    } else {
      setBtnStatus(false);
    }
  };

  const handleTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    setScrollY(0);
    setBtnStatus(false);
  };

  useEffect(() => {
    const watch = () => {
      window.addEventListener('scroll', handleFollow);
    };
    watch();
    return () => {
      window.removeEventListener('scroll', handleFollow);
    };
  });

  return (
    <button
      className={BtnStatus ? 'topBtn active' : 'topBtn'}
      onClick={handleTop}
    >
      <img src={ArrowTop} alt="최상단으로 가기" className="w-[18px]" />
    </button>
  );
}
