import { useState, useRef, useEffect } from 'react';

import { Button } from '@/components/commonUi/button/Button';
import useAuthContext from '@/hook/useAuthContext';
import useDeleteComment from '@/hook/useDeleteComment';
import useUpdateComment from '@/hook/useUpdateComment';

interface CommentEditProps {
  commentId: string;
  userId: string;
  originalText: string;
  onClose: () => void;
}

const CommentEdit: React.FC<CommentEditProps> = ({
  commentId,
  userId,
  originalText,
  onClose,
}) => {
  const dialogRef = useRef<HTMLDialogElement>();
  const { user } = useAuthContext();
  const deleteComment = useDeleteComment();
  const updateComment = useUpdateComment();
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(originalText);
  const toggleEdit = () => setIsEditing(!isEditing);
  const saveEdit = async () => {
    await updateComment(commentId, editedText);
    setIsEditing(false);
    onClose();
  };

  useEffect(() => {
    if (dialogRef.current && isEditing) {
      dialogRef.current.showModal();
    }
  }, [isEditing]);

  return (
    <>
      <dialog
        ref={(node) => {
          if (node && !dialogRef.current) {
            dialogRef.current = node;
            node.showModal();
          }
        }}
        aria-labelledby="dialog-label"
        className="w-[300px] rounded-sm bg-gray-50 overflow-hidden text-center cursor-pointer text-sm"
      >
        {user?.uid === userId && (
          <>
            {isEditing ? (
              <div className="w-[90%] my-4 rounded-md mx-auto">
                <p className="text-left text-xs text-gray-700 ml-2 mb-1">
                  댓글수정
                </p>
                <textarea
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                  className="w-full p-2 rounded-sm border"
                />
                <div className="flex justify-between mt-4 ">
                  <Button size="light" variant="outline" onClick={onClose}>
                    취소
                  </Button>
                  <Button size="light" onClick={saveEdit}>
                    완료
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex-col">
                <button onClick={toggleEdit} className="w-full py-3">
                  수정
                </button>
                <button
                  onClick={() => deleteComment(commentId)}
                  className="border-t-2 border-b-2 w-full py-3 text-error"
                >
                  삭제
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className=" w-full py-3"
                >
                  취소
                </button>
              </div>
            )}
          </>
        )}
      </dialog>
    </>
  );
};

export default CommentEdit;
