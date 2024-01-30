import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LogIn from '../pages/LogIn';
import SignUp from '../pages/SignUp';
import Navbar from '../components/ui/NavBar';
import Home from '../pages/Home';

export default function Router() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />

          <Route path="/" element={<Navbar />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
