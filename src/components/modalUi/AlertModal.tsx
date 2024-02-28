import { useRef } from 'react';

import Overlay from '@/components/commonUi/overlay/Overlay';
import { Button } from '@/components/commonUi/button/Button';

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
  const modalRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <Overlay />
      <dialog
        ref={modalRef}
        className="w-[23%] rounded-md fixed inset-0 flex items-center justify-center z-50 p-5"
      >
        <div>
          <h2 className="font-bold text-lg my-2 mb-4">{title}</h2>
          <div className="flex gap-2">
            <Button
              onClick={onClose}
              ref={closeButtonRef}
              variant="outline"
              size="light"
            >
              {btnNameList[0]}
            </Button>
            <Button onClick={handleAgreeBtn} size="light">
              {btnNameList[1]}
            </Button>
          </div>
        </div>
      </dialog>
    </>
  );
}
