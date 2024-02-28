import { useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import useEditContext from '@/hook/useEditContext';

import Overlay from '@/components/commonUi/overlay/Overlay';
import Close from '@/assets/Icon/Icon-close.svg';
import { Button } from '@/components/commonUi/button/Button';

interface Props {
  onClose: () => void;
  setDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal = ({ onClose, setDeleteModalOpen }: Props) => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const { setFeedIdToEdit, setIsEditModalOpen } = useEditContext();
  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      navigate('/home');
    }
  }, [id, navigate]);

  const handleDeleteFeed = () => {
    setDeleteModalOpen(true);
    onClose();
  };

  const goToEditFeed = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (id) {
      setFeedIdToEdit(id);
      setIsEditModalOpen(true);
      onClose();
    }
  };

  return (
    <>
      <Overlay />
      <dialog
        className="w-[23%] rounded-md fixed inset-0 flex items-center justify-center z-50 p-5"
        ref={modalRef}
      >
        <div>
          <h2 className="font-bold text-lg my-2 mb-4">게시글 변경</h2>

          <div className="flex justify-between gap-2">
            <Button type="button" onClick={handleDeleteFeed} size="light">
              삭제하기
            </Button>
            <Button type="button" onClick={goToEditFeed} size="light">
              수정하기
            </Button>
          </div>
          <button
            type="button"
            onClick={onClose}
            ref={closeButtonRef}
            className="absolute top-2 right-2 "
          >
            <img src={Close} alt="모달 닫기 버튼" />
          </button>
        </div>
      </dialog>
    </>
  );
};
export default Modal;
