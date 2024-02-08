import { useRef, useEffect } from 'react';

import useEditContext from '@/hook/useEditContext';

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

  return (
    <div role="dialog" aria-labelledby="modal-select">
      <div
        className="modal-content"
        role="document"
        tabIndex={-1}
        ref={modalRef}
      >
        <div className="modal-header" id="modal-select">
          <h2 tabIndex={0}>게시글 변경</h2>
        </div>
        <div className="modal-list">
          <button type="button" onClick={handleDeleteFeed}>
            삭제하기
          </button>
          <button type="button" onClick={setEditFeedContext}>
            수정하기
          </button>
        </div>
        <button
          type="button"
          className="close-button"
          onClick={onClose}
          tabIndex={0}
          ref={closeButtonRef}
        >
          <img src={Close} alt="모달 닫기 버튼" />
        </button>
      </div>
    </div>
  );
};
export default Modal;
