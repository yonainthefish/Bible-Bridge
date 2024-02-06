import { Outlet } from 'react-router-dom';

import NavBar from '@/components/common/NavBar';
import Header from '@/components/common/Header';
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
