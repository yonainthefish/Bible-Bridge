import { Outlet } from 'react-router-dom';

import useAuthContext from '@/hook/useAuthContext';
import useEditContext from '@/hook/useEditContext';
import useUploadContext from '@/hook/useUploadContext';

import EditFeedModal from '@/pages/upload/EditFeedModal';
import Upload from '@/pages/upload/Upload';

export default function DialogRoute() {
  const { user } = useAuthContext();
  const { isEditModalOpen } = useEditContext();
  const { isUploadModalOpen } = useUploadContext();

  if (!user) {
    return <Outlet />;
  }

  return (
    <>
      <Outlet />
      {isEditModalOpen && <EditFeedModal />}
      {isUploadModalOpen && <Upload />}
    </>
  );
}
