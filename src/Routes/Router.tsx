import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthRoute, NonAuthRoute } from './AuthRoute';
import useAuthContext from '../hook/useAuthContext';
import NavCommonRoute from '@/Routes/LayoutRoute';

import Splash from '@/pages/Splaysh/Splash';
import StaticSplash from '@/pages/Splaysh/StaticSplash';

import LogIn from '@/pages/LogIn';
import SignUp from '@/pages/SignUp';
import Home from '@/pages/Home';
import MyPage from '@/pages/Mypage/MyPage';

export default function Router() {
  const { isAuthReady } = useAuthContext();

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Splash />}></Route>
          {!isAuthReady ? (
            <Route path="*" element={<StaticSplash />}></Route>
          ) : (
            <>
              <Route element={<NonAuthRoute />}>
                <Route path="/login" element={<LogIn />} />
                <Route path="/signup" element={<SignUp />} />
              </Route>

              <Route element={<AuthRoute />}>
                <Route element={<NavCommonRoute />}>
                  <Route path="/home" element={<Home />} />
                  <Route path="/mypage" element={<MyPage />} />
                </Route>
              </Route>
            </>
          )}
        </Routes>
      </BrowserRouter>
    </>
  );
}
