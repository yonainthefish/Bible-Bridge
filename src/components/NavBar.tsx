import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <>
      <Link to={'/search'}>Search</Link>
      <Link to={'/'}>홈</Link>
      <Link to={'/upload'}>업로드</Link>
      <Link to={'/mypage'}>마이페이지</Link>
      <Link to={'/logout'}>로그아웃</Link>
    </>
  );
}
