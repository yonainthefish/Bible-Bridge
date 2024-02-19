import { useEffect, useState, SyntheticEvent, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { appFireStore, Timestamp } from '@/firebase/config';
import { doc, setDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

import Preview from '@/components/fileUpload/Preview';
import { Label } from '@/components/commonUi/label/Label';
import { Input } from '@/components/commonUi/input/Input';
import { Button } from '@/components/commonUi/button/Button';

import useAuthContext from '@/hook/useAuthContext';
import useUploadContext from '@/hook/useUploadContext';
import uploadImageToStorage from '@/pages/upload/UploadImgToStorage';

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
    console.log('dkdk');
  }, []);

  const closeUploadModal = () => {
    if (dialogRef.current && dialogRef.current.close) {
      dialogRef.current.close();
    }
    setIsUploadModalOpen(false);
  };

  return (
    <dialog ref={dialogRef} aria-labelledby="dialog-label">
      <h2>Upload Post</h2>
      <p>오늘의 묵상을 나눠주세요</p>
      <div className=" w-[100px] h-[100px]  mx-auto ">
        <Preview setFile={setFile} />
      </div>
      <div>
        <Label></Label>
        <Input
          type="text"
          placeholder="제목"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
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
            placeholder="문구를 입력해주세요..."
          ></textarea>
        </form>
      </div>
      <Button type="button" onClick={handleSubmit}>
        업로드
      </Button>
      <Button onClick={() => closeUploadModal()}>닫기</Button>
    </dialog>
  );
}
