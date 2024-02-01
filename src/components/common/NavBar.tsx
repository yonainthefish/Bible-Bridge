import React from 'react';

import { Link } from 'react-router-dom';
import search from '@/assets/Icon/Icon-search.svg';
import home from '@/assets/Icon/Icon-home.svg';
import upload from '@/assets/Icon/Icon-upload.svg';
import mypage from '@/assets/Icon/Icon-my.svg';
import logout from '@/assets/Icon/Icon-logout.svg';

const menuItems = [
  { to: '/search', label: 'Search', image: search },
  { to: '/home', label: 'Home', image: home },
  { to: '/upload', label: 'Upload', image: upload },
  { to: '/mypage', label: 'My', image: mypage },
  { to: '/logout', label: 'Logout', image: logout },
];

export default function Navbar() {
  const commonClasses =
    'bg-gray-0 w-full h-20  text-gray-600 text-small flex justify-center items-center hover:bg-primary-30';

  return (
    <nav className="bg-gray-0 h-full w-20 border-l-2 border-gray-100 fixed right-0 z-10 flex flex-col">
      {menuItems.map((item, index) => (
        <Link key={index} to={item.to} className={commonClasses}>
          <div>
            <img src={item.image} alt={item.label} className="mx-auto w-5" />
            <p>{item.label}</p>
          </div>
        </Link>
      ))}
    </nav>
  );
}
