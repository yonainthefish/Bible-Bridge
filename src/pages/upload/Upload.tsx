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
  const [inputCount, setInputCount] = useState(0);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (!user) {
      console.error('사용자가 로그인되지 않았습니다.');
      return;
    }
    if (file === null) {
      alert('사진을 선택해주세요');
      return;
    }

    try {
      const id = uuidv4();
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
        authorDisplayName: user.displayName,
        authorPhotoURL: user.photoURL,
      };

      const userDocRef = doc(appFireStore, 'feed', id);
      await setDoc(userDocRef, uploadData);

      closeUploadModal();
      navigate(`/feed/${id}`);
    } catch (error) {
      console.error('업로드 중 오류가 발생했습니다:', error);
    }
  };

  useEffect(() => {
    if (dialogRef.current && dialogRef.current.showModal) {
      dialogRef.current.showModal();
    }
  }, []);

  const onInputHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputCount(e.target.value.length);
  };

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
      className="w-[32%] py-[25px] px-[70px] relative rounded-sm"
    >
      <h2 className="text-title font-700">Upload Post</h2>
      <p className="text-small text-gray-500">오늘의 묵상을 나눠주세요</p>
      <div className=" w-[100%] aspect-square  mx-auto my-[15px] bg-gray-900 flex items-center justify-center">
        <Preview setFile={setFile} />
      </div>
      <Input
        type="text"
        placeholder="묵상 제목을 적어주세요"
        value={title}
        maxLength={30}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        className="mt-[25px] mb-[10px] border border-gray-300 rounded-sm"
      ></Input>
      <form className="uploadInfo">
        <textarea
          id="uploadText"
          maxLength={500}
          cols={30}
          rows={10}
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            onInputHandler(e);
          }}
          placeholder="묵상한 내용을 적어주세요"
          className="w-[100%] h-[120px] px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus:ring-violet-300   disabled:cursor-not-allowed disabled:opacity-50 border border-gray-300 rounded-sm"
        ></textarea>
        <div className="text-right text-xs">
          <span>{inputCount}</span> / 500 자
        </div>
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
