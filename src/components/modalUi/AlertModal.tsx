import { useRef, useEffect } from 'react';

import Overlay from '@/components/commonUi/overlay/Overlay';

export default function AlertModal({
  onClose,
  handleAgreeBtn,
  title,
  btnNameList,
}: {
  onClose: () => void;
  handleAgreeBtn: () => void;
  title: string;
  btnNameList: string[];
}) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

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

  const buttonStyle =
    'w-full border-2 border-gray-100 bg-gray-100 rounded-md text-gray-800 my-3 py-2 hover:border-primary-main hover:bg-primary-main transition-colors duration-300';

  return (
    <div
      role="dialog"
      aria-labelledby="modal-select"
      className="fixed inset-0 flex items-center justify-center z-10"
    >
      <Overlay />
      <div
        role="document"
        tabIndex={-1}
        ref={modalRef}
        className="w-[20%] bg-gray-1 p-4 rounded-md relative"
      >
        <h2 tabIndex={0} className="font-bold text-lg mt-2">
          {title}
        </h2>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={onClose}
            ref={closeButtonRef}
            className={buttonStyle}
          >
            {btnNameList[0]}
          </button>
          <button
            type="button"
            onClick={handleAgreeBtn}
            className={buttonStyle}
          >
            {btnNameList[1]}
          </button>
        </div>
      </div>
    </div>
  );
}
