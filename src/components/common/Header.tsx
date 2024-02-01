import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '@/assets/Img/Logo-text-small.svg';

export default function Header() {
  return (
    <>
      <header className="w-full h-20 px-16 bg-gray-0 flex items-center fixed top-0 left-0 right-0 z-20">
        <Link to="/home">
          <h1>
            <img className="w-[250px]" src={Logo} alt="바이블브릿지 로고" />
          </h1>
        </Link>
      </header>
    </>
  );
}
