import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthRoute, NonAuthRoute } from '@/routes/AuthRoute';
import useAuthContext from '@/hook/useAuthContext';
import NavCommonRoute from '@/routes/LayoutRoute';

import Splash from '@/pages/splaysh/Splash';
import StaticSplash from '@/pages/splaysh/StaticSplash';

import LogIn from '@/pages/login/LogIn';
import SignUp from '@/pages/SignUp';
import Home from '@/pages/Home';
import MyPage from '@/pages/myPage/MyPage';
import Setting from '@/pages/Setting';
import Upload from '@/pages/upload/Upload';
import Explore from '@/pages/Explore';
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
                  <Route path="/upload" element={<Upload />} />
                  <Route path="/setting" element={<Setting />} />
                  <Route path="/explore" element={<Explore />} />
                </Route>
              </Route>
            </>
          )}
        </Routes>
      </BrowserRouter>
    </>
  );
}
