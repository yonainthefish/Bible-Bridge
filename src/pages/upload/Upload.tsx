import { useEffect, useState, SyntheticEvent, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { appFireStore, Timestamp } from '@/firebase/config';
import { doc, setDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

import Preview from '@/components/fileUpload/Preview';
import { Input } from '@/components/commonUi/input/Input';
import { Button } from '@/components/commonUi/button/Button';

import useAuthContext from '@/hook/useAuthContext';
import useUploadContext from '@/hook/useUploadContext';
import uploadImageToStorage from '@/pages/upload/UploadImgToStorage';
import closeImg from '@/assets/Icon/Icon-close.svg';

export default function Upload() {
  const navigate = useNavigate();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { setIsUploadModalOpen } = useUploadContext();
  const { user } = useAuthContext();
  const [file, setFile] = useState<FileList | null>(null);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      if (user) {
        const id = uuidv4();
        const userDocRef = doc(appFireStore, 'feed', id);
        if (file === null) {
          alert('Please select a file');
          return;
        }

        const downloadURLs = await uploadImageToStorage(
          file,
          `feed/${user.uid}`,
          id,
        );

        const uploadData = {
          title: title,
          text: text,
          timestamp: Timestamp.now(),
          imageUrl: downloadURLs,
          userId: user.uid,
        };
        await setDoc(userDocRef, uploadData);
        navigate(`/feed/${id}`);
      } else {
        console.error('사용자가 로그인돠지 않았습니다.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (dialogRef.current && dialogRef.current.showModal) {
      dialogRef.current.showModal();
    }
  }, []);

  const closeUploadModal = () => {
    if (dialogRef.current && dialogRef.current.close) {
      dialogRef.current.close();
    }
    setIsUploadModalOpen(false);
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="dialog-label"
      className="w-[32%] py-[25px] px-[70px] relative rounded-sm backdrop-blur-3xl"
    >
      <h2 className="text-title font-700">Upload Post</h2>
      <p className="text-small text-gray-500">오늘의 묵상을 나눠주세요</p>
      <div className=" w-[100%] aspect-square  mx-auto my-[15px] bg-gray-900 flex items-center justify-center">
        <Preview setFile={setFile} />
      </div>
      <Input
        type="text"
        placeholder="묵상한 구절을 적어주세요"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        className="mt-[25px] mb-[10px] border-2 border-gray-300 rounded-sm"
      ></Input>
      <form className="uploadInfo">
        <textarea
          id="uploadText"
          maxLength={1000}
          cols={30}
          rows={10}
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
          placeholder="묵상한 내용을 적어주세요"
          className="w-[100%] h-[120px] px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus:ring-violet-300   disabled:cursor-not-allowed disabled:opacity-50 border-2 border-gray-300 rounded-sm"
        ></textarea>
      </form>

      <Button type="button" onClick={handleSubmit} className="mt-[15px]">
        Upload
      </Button>

      <img
        src={closeImg}
        alt="업로드 모달창 닫기"
        onClick={() => closeUploadModal()}
        className="cursor-pointer absolute top-4 right-4"
      />
    </dialog>
  );
}
