import React from 'react';
import BasicUserImg from '@/assets/Img/Img-user.svg';

interface UserImgAndNameProps {
  authorPhotoURL?: string;
  authorDisplayName?: string;
}

const UserImgAndName: React.FC<UserImgAndNameProps> = ({
  authorPhotoURL,
  authorDisplayName,
}) => {
  return (
    <div className="flex items-center gap-2">
      <img
        src={authorPhotoURL || BasicUserImg}
        alt="User"
        className="h-7 w-7 rounded-full object-cover"
      />
      <p className="text-small font-600">{authorDisplayName || '알 수 없음'}</p>
    </div>
  );
};

export default UserImgAndName;
