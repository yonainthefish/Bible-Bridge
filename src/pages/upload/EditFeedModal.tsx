import { useEffect, useState, SyntheticEvent, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Preview from '@/components/fileUpload/Preview';
import { Input } from '@/components/commonUi/input/Input';
import { Button } from '@/components/commonUi/button/Button';

import useAuthContext from '@/hook/useAuthContext';
import useGetFeedData from '@/hook/useGetFeedDate';
import useEditContext from '@/hook/useEditContext';
import useEditFeed from '@/hook/useEditFeed';

import uploadImageToStorage from '@/pages/upload/UploadImgToStorage';

import closeImg from '@/assets/Icon/Icon-close.svg';

export default function EditFeedModal() {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [file, setFile] = useState<FileList | null>(null);
  const [imageUrl, setImageUrl] = useState([]);
  const [timestamp, setTimestamp] = useState(null);
  const [userId, setUserId] = useState('');
  const [authorDisplayName, setAuthorDisplayName] = useState('');
  const [authorPhotoURL, setAuthorPhotoURL] = useState('');
  const [isPending, setIsPending] = useState(false);
  const [inputCount, setInputCount] = useState(0);
  const getFeedData = useGetFeedData();

  const { user } = useAuthContext();

  const dialogRef = useRef<HTMLDialogElement>(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const editFeed = useEditFeed();
  const { setIsEditModalOpen, feedIdToEdit, setFeedIdToEdit } =
    useEditContext();

  useEffect(() => {
    const setFeedData = async () => {
      if (!id) {
        return;
      }
      const data = await getFeedData(id);

      if (data) {
        setTitle(data.title);
        setText(data.text);
        setTimestamp(data.timestamp);
        setImageUrl(data.imageUrl[0]);
        setUserId(data.userId);
        setAuthorDisplayName(data.authorDisplayName);
        setAuthorPhotoURL(data.authorPhotoURL);
      }
    };

    setFeedData();
  }, [id, getFeedData]);

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
      setIsPending(true);
      let downloadURLs: string[] = imageUrl;

      if (!id) {
        return;
      }

      if (file !== null) {
        downloadURLs = await uploadImageToStorage(file, `feed/${user.uid}`, id);
      }

      const editData = {
        title: title,
        text: text,
        timestamp: timestamp,
        imageUrl: downloadURLs,
        userId: userId,
        authorDisplayName: authorDisplayName,
        authorPhotoURL: authorPhotoURL,
      };

      await editFeed(editData, id);
    } catch (error) {
      console.error(error);
    }
    setIsPending(false);
    navigate(`/feed/${feedIdToEdit}`);
    closeEditFeedModal();
  };

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }

    if (dialogRef.current && dialogRef.current.showModal) {
      dialogRef.current.showModal();
    }
  }, [user, navigate]);

  const onInputHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputCount(e.target.value.length);
  };

  const closeEditFeedModal = () => {
    if (dialogRef.current && dialogRef.current.close) {
      dialogRef.current.close();
    }
    setIsEditModalOpen(false);
    setFeedIdToEdit('');
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="dialog-label"
      className={`w-[32%] py-[25px] px-[70px] relative rounded-sm
      ${isPending ? 'loading' : ''}`}
    >
      <h2 className="text-title font-700">Edit Post</h2>
      <p className="text-small text-gray-500">오늘의 묵상을 나눠주세요</p>
      <div className=" w-[100%] aspect-square  mx-auto my-[15px] bg-gray-900 flex items-center justify-center">
        <Preview setFile={setFile} imgUrlList={imageUrl} />
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
        onClick={closeEditFeedModal}
        className="cursor-pointer absolute top-4 right-4"
      />
    </dialog>
  );
}
