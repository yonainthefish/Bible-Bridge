import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LogIn from '../pages/LogIn';
import SignUp from '../pages/SignUp';
import Navbar from '../components/Nav';

export default function Router() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route>
            <Route path="/login" element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
