import { Outlet, Navigate } from 'react-router-dom';

import useAuthContext from '../hook/useAuthContext';
import useUploadContext from '@/hook/useUploadContext';

import Upload from '@/pages/upload/Upload';

export function AuthRoute() {
  const { user } = useAuthContext();
  const { isUploadModalOpen } = useUploadContext();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Outlet />
      {isUploadModalOpen && <Upload />}
    </>
  );
}

export function NonAuthRoute() {
  const { user } = useAuthContext();

  if (user) {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
}
