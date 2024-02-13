import { useRef, useEffect } from 'react';

import useEditContext from '@/hook/useEditContext';

import Overlay from '@/components/commonUi/overlay/Overlay';
import Close from '@/assets/Icon/Icon-close.svg';

interface Props {
  onClose: () => void;
  feedId: string;
  setDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal = ({ onClose, feedId, setDeleteModalOpen }: Props) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const { setFeedIdToEdit, setIsEditModalOpen } = useEditContext();

  const handleDeleteFeed = () => {
    setDeleteModalOpen(true);
    onClose();
  };

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Tab') {
        const focusableElements = modalRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        if (focusableElements) {
          const firstElement = focusableElements[0] as HTMLElement;
          const lastElement = focusableElements[
            focusableElements.length - 1
          ] as HTMLElement;
          if (event.shiftKey && document.activeElement === firstElement) {
            lastElement.focus();
            event.preventDefault();
          } else if (
            !event.shiftKey &&
            document.activeElement === lastElement
          ) {
            firstElement.focus();
            event.preventDefault();
          }
        }
      }
    };
    document.addEventListener('keydown', handleKeydown);

    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  }, []);

  const setEditFeedContext = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setFeedIdToEdit(feedId);
    setIsEditModalOpen(true);
    onClose();
  };

  const buttonStyle =
    'w-full border-2 border-gray-100 bg-gray-100 rounded-md text-gray-800 my-3 py-2 hover:border-primary-main hover:bg-primary-main transition-colors duration-300';

  return (
    <div
      role="dialog"
      aria-labelledby="modal-select"
      className="fixed inset-0 flex items-center justify-center z-50"
    >
      <Overlay />
      <div
        className="w-[300px] bg-gray-1 p-4 rounded-md relative"
        role="document"
        tabIndex={-1}
        ref={modalRef}
      >
        <h2 tabIndex={0} className="font-bold text-lg mt-2">
          게시글 변경
        </h2>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleDeleteFeed}
            className={buttonStyle}
          >
            삭제하기
          </button>
          <button
            type="button"
            onClick={setEditFeedContext}
            className={buttonStyle}
          >
            수정하기
          </button>
        </div>
        <button
          type="button"
          onClick={onClose}
          tabIndex={0}
          ref={closeButtonRef}
          className="absolute top-2 right-2 "
        >
          <img src={Close} alt="모달 닫기 버튼" />
        </button>
      </div>
    </div>
  );
};
export default Modal;
