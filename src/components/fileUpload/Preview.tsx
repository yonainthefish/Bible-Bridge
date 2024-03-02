import { useState, SetStateAction, Dispatch, useEffect } from 'react';
import ImgUpload from '@/assets/Icon/Icon-add.svg';

const Preview = ({
  setFile,
  imgUrlList,
}: {
  setFile: Dispatch<SetStateAction<FileList | null>>;
  imgUrlList: string[];
}) => {
  const [imageUrl, setImageUrl] = useState<string>('');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setFile(files);

      if (!/^image\/(jpg|svg|png|jpeg|bmp|tif|heic)$/.test(file.type)) {
        alert(
          '이미지 파일 확장자는 jpg, svg, png, jpeg, bmp, tif, heic만 가능합니다.',
        );
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        alert('이미지 용량은 10MB 이내로 등록 가능합니다.');

        setFile(null);
        setImageUrl('');
        return;
      }

      const imageUrl = URL.createObjectURL(file);
      setImageUrl(imageUrl);
    } else {
      alert('이미지 파일을 선택해주세요.');
      setFile(null);
      setImageUrl('');
    }
  };

  useEffect(() => {
    setImageUrl(imgUrlList[0] || '');
  }, [imgUrlList]);

  return (
    <>
      {imageUrl ? (
        <img src={imageUrl} alt="업로드된 이미지 미리보기" />
      ) : (
        <label htmlFor="file" className="relative cursor-pointer">
          <img
            src={ImgUpload}
            alt="사진 업로드 버튼"
            className="text-red bg-gray-1 rounded-full p-1"
          />
        </label>
      )}
      <input
        accept="image/*"
        type="file"
        id="file"
        onChange={(e) => handleImageUpload(e)}
        className="sr-only"
      />
    </>
  );
};

Preview.defaultProps = {
  imgUrlList: [],
};

export default Preview;
