import { useNavigate } from 'react-router-dom';
import { logout } from '@/utils/SDKUtils';

import useUploadContext from '@/hook/useUploadContext';

import searchIcon from '@/assets/Icon/Icon-search.svg';
import homeIcon from '@/assets/Icon/Icon-home.svg';
import uploadIcon from '@/assets/Icon/Icon-upload.svg';
import myPageIcon from '@/assets/Icon/Icon-my.svg';
import logoutIcon from '@/assets/Icon/Icon-logout.svg';
import exploreIcon from '@/assets/Icon/Icon-explore.svg';

interface MenuItem {
  action?: () => void;
  label: string;
  image: string;
}

export default function Navbar() {
  const navigate = useNavigate();
  const { setIsUploadModalOpen } = useUploadContext();

  const menuItems: MenuItem[] = [
    { label: 'Home', image: homeIcon, action: () => navigate('/home') },
    { label: 'Search', image: searchIcon, action: () => navigate('/search') },
    {
      label: 'Explore',
      image: exploreIcon,
      action: () => navigate('/explore'),
    },
    {
      label: 'Upload',
      image: uploadIcon,
      action: () => setIsUploadModalOpen(true),
    },
    { label: 'My', image: myPageIcon, action: () => navigate('/myPage') },
    { label: 'Logout', image: logoutIcon, action: logout },
  ];

  const commonClasses =
    'w-full h-20 bg-gray-0 text-gray-600 text-small items-center hover:bg-primary-30';
  const navStyle =
    'w-20 h-full bg-gray-0 border-l-2 border-gray-100 fixed top-0 right-0 flex flex-col z-30';

  return (
    <nav className={navStyle}>
      {menuItems.map((item, index) => (
        <button key={index} className={commonClasses} onClick={item.action}>
          <img src={item.image} alt={item.label} className="w-[20px] mx-auto" />
          <p>{item.label}</p>
        </button>
      ))}
    </nav>
  );
}
