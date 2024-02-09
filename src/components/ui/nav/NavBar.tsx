import { Link } from 'react-router-dom';
import { logout } from '@/utils/SDKUtils';

import searchIcon from '@/assets/Icon/Icon-search.svg';
import homeIcon from '@/assets/Icon/Icon-home.svg';
import uploadIcon from '@/assets/Icon/Icon-upload.svg';
import myPageIcon from '@/assets/Icon/Icon-my.svg';
import logoutIcon from '@/assets/Icon/Icon-logout.svg';
import exploreIcon from '@/assets/Icon/Icon-explore.svg';

const menuItems = [
  { to: '/home', label: 'Home', image: homeIcon },
  { to: '/search', label: 'Search', image: searchIcon },
  { to: '/explore', label: 'Explore', image: exploreIcon },
  { to: '/upload', label: 'Upload', image: uploadIcon },
  { to: '/myPage', label: 'My', image: myPageIcon },
  { to: '/login', label: 'Logout', image: logoutIcon },
];

export default function Navbar() {
  const commonClasses =
    'w-full h-20 bg-gray-0 text-gray-600 text-small flex justify-center items-center hover:bg-primary-30';

  const navStyle =
    'w-20 h-full bg-gray-0 border-l-2 border-gray-100 fixed top-0 right-0 flex flex-col z-30';

  return (
    <nav className={navStyle}>
      {menuItems.map((item, index) => (
        <Link key={index} to={item.to} className={commonClasses}>
          <div onClick={item.label === 'Logout' ? logout : undefined}>
            <img
              src={item.image}
              alt={item.label}
              className="w-[20px] mx-auto"
            />
            <p>{item.label}</p>
          </div>
        </Link>
      ))}
    </nav>
  );
}
