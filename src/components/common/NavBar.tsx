import React from 'react';

import { logout } from '../../utils/SDKUtils';

import { Link } from 'react-router-dom';
import searchIcon from '@/assets/Icon/Icon-search.svg';
import homeIcon from '@/assets/Icon/Icon-home.svg';
import uploadIcon from '@/assets/Icon/Icon-upload.svg';
import mypageIcon from '@/assets/Icon/Icon-my.svg';
import logoutIcon from '@/assets/Icon/Icon-logout.svg';

const menuItems = [
  { to: '/search', label: 'Search', image: searchIcon },
  { to: '/home', label: 'Home', image: homeIcon },
  { to: '/upload', label: 'Upload', image: uploadIcon },
  { to: '/mypage', label: 'My', image: mypageIcon },
  { to: '/login', label: 'Logout', image: logoutIcon },
];

export default function Navbar() {
  const commonClasses =
    'bg-gray-0 w-full h-20 text-gray-600 text-small flex justify-center items-center hover:bg-primary-30';

  return (
    <nav className="bg-gray-0 h-full w-20 border-l-2 border-gray-100 fixed right-0 flex flex-col z-30">
      {menuItems.map((item, index) => (
        <Link key={index} to={item.to} className={commonClasses}>
          <div onClick={item.label === 'Logout' ? logout : undefined}>
            <img src={item.image} alt={item.label} className="mx-auto w-5" />
            <p>{item.label}</p>
          </div>
        </Link>
      ))}
    </nav>
  );
}
