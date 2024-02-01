import { Outlet, Navigate } from 'react-router-dom';

import useAuthContext from '../hook/useAuthContext';

export function AuthRoute() {
  const { user } = useAuthContext();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Outlet />
    </>
  );
}

export function NonAuthRoute() {
  const { user } = useAuthContext();
  console.log(user);
  if (user) {
    return <Navigate to="/home" replace />;
    console.log('hi');
  }

  return <Outlet />;
}
