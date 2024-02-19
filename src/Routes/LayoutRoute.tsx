import { Outlet } from 'react-router-dom';

import NavBar from '@/components/commonUi/nav/NavBar';
import Header from '@/components/commonUi/header/Header';
// import Footer from '@/components/commonUi/footer/Footer';

export default function LayoutRoute() {
  return (
    <div className="pt-20 pr-20">
      <Header />
      <NavBar />
      {/* <Footer /> */}
      <Outlet />
    </div>
  );
}
