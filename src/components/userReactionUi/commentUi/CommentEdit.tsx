import { useState, useEffect, useRef } from 'react';

import useAuthContext from '@/hook/useAuthContext';
import useDeleteComment from '@/hook/useDeleteComment';
import useUpdateComment from '@/hook/useUpdateComment';

import DeleteIcon from '@/assets/Icon/Icon-delete.svg';
import EditIcon from '@/assets/Icon/Icon-edit.svg';

interface CommentEditProps {
  commentId: string;
  userId: string;
  originalText: string;
}

const CommentEdit: React.FC<CommentEditProps> = ({
  commentId,
  userId,
  originalText,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { user } = useAuthContext();
  const deleteComment = useDeleteComment();
  const updateComment = useUpdateComment();
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(originalText);
  const toggleEdit = () => setIsEditing(!isEditing);
  const saveEdit = async () => {
    await updateComment(commentId, editedText);
    setIsEditing(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        console.log('모달 바깥 클릭 감지');
        setIsEditing(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={modalRef} className="absolute top-0 right-0 bg-gray-50">
      {user?.uid === userId && (
        <>
          {isEditing ? (
            <>
              <textarea
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                className="text-small"
              />
              <button onClick={saveEdit} className="text-small">
                저장하기
              </button>
            </>
          ) : (
            <div className="flex flex-col border-2 border-gray-200 bg-gray-1 rounded-md overflow-hidden">
              <button
                onClick={toggleEdit}
                className="flex items-center justify-center p-1 text-small  cursor-pointer "
              >
                <img src={EditIcon} alt="수정하기" className="mr-1" />
                수정하기
              </button>
              <button
                onClick={() => deleteComment(commentId)}
                className="flex items-center justify-center p-1 text-small  cursor-pointer "
              >
                <img src={DeleteIcon} alt="삭제하기" className="mr-1" />
                삭제하기
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CommentEdit;
