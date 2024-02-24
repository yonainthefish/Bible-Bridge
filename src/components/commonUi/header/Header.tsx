import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Logo from '@/assets/Img/Logo-text-small.svg';

export default function Header() {
  const [shadow, setShadow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setShadow(true);
      } else {
        setShadow(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <header
        className={`w-[calc(100%-80px)] h-20 px-16 bg-gray-0 flex items-center fixed top-0 left-0 right-0 z-20
        ${shadow ? 'shadow-md' : ''}`}
      >
        <Link to="/home">
          <h1>
            <img className="w-[250px]" src={Logo} alt="바이블브릿지 로고" />
          </h1>
        </Link>
      </header>
    </>
  );
}
