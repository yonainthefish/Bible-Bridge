import { Outlet } from 'react-router-dom';

import NavBar from '@/components/ui/nav/NavBar';
import Header from '@/components/ui/header/Header';
// import Footer from '@/components/common/Footer';

export default function NavCommonRoute() {
  return (
    <>
      <Header />
      <NavBar />
      {/* <Footer /> */}
      <Outlet />
    </>
  );
}
