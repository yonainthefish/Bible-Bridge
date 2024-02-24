import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthRoute, NonAuthRoute } from '@/routes/AuthRoute';
import useAuthContext from '@/hook/useAuthContext';
import LayoutRoute from '@/routes/LayoutRoute';

import Splash from '@/pages/splash/Splash';
import StaticSplash from '@/pages/splash/StaticSplash';

import LogIn from '@/pages/login/LogIn';
import SignUp from '@/pages/signup/SignUp';
import Home from '@/pages/home/Home';
import MyPage from '@/pages/myPage/MyPage';
import Setting from '@/pages/setting/Setting';
import Upload from '@/pages/upload/Upload';
import Explore from '@/pages/explore/Explore';
import FeedDetail from '@/pages/feedDetail/FeedDetail';

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
                <Route element={<LayoutRoute />}>
                  <Route path="/home" element={<Home />} />
                  <Route path="/mypage/:userId" element={<MyPage />} />
                  <Route path="/upload" element={<Upload />} />
                  <Route path="/setting" element={<Setting />} />
                  <Route path="/explore" element={<Explore />} />
                  <Route path="/feed/:id" element={<FeedDetail />} />
                </Route>
              </Route>
            </>
          )}
        </Routes>
      </BrowserRouter>
    </>
  );
}
