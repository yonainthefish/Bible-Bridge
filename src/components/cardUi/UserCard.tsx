// import { useContext, useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { DocumentData } from '@firebase/firestore';

// import useGetFeedData from '@/hook/useGetFeedDate';
// import useEditContext from '@/hook/useEditContext';
// import { AuthContext } from '@/context/AuthContext';

// import Modal from '@/components/modalUi/SelectModal';
// import DeleteFeedModal from '@/components/modalUi/DeleteFeedModal';

// import SeeMore from '@/assets/Icon/Icon-More.svg';

// const UserCard = () => {
//   const { user } = useContext(AuthContext);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [deleteModalOpen, setDeleteModalOpen] = useState(false);
//   const [feedData, setFeedData] = useState<DocumentData | null>(null);
// //   const [time, setTime] = useState('');
//   const [InvalidId, setInvalidId] = useState(false);
//   const getFeedData = useGetFeedData();
//   const { isEditModalOpen } = useEditContext();
//   const { id } = useParams();
//   const handleSeeMoreClick = () => {
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//   };

//   const handleDeleteCloseModal = () => {
//     setDeleteModalOpen(false);
//     setIsModalOpen(false);
//   };

// //   useEffect(() => {
// //     (async () => {
// //       const feedData = await getFeedData(id);

// //       if (feedData) {
// //         setFeedData(feedData);

// //         const date = new Date(feedData.timestamp.toDate());
// //         const time = new Date(date.setHours(date.getHours() + 9))
// //           .toISOString()
// //           .slice(0, 10);

// //         setTime(time);
// //       } else {
// //         setInvalidId(true);
// //       }
// //     })();
// //   }, [isEditModalOpen]);

//   return (
//     <>
//       <div className="flex justify-between my-1 px-2">
//         <div className="flex items-center gap-2">
//           {user?.photoURL && (
//             <img
//               src={user.photoURL}
//               alt="User"
//               className="h-9 w-9 rounded-full object-cover"
//             />
//           )}
//           <p className="text-small">{user?.displayName || '알 수 없음'}</p>
//         </div>
//         <button className="more" type="button" onClick={handleSeeMoreClick}>
//           <img src={SeeMore} alt="더보기" />
//         </button>
//       </div>

//       {isModalOpen && (
//         <Modal
//           setDeleteModalOpen={setDeleteModalOpen}
//           feedId={id}
//           onClose={handleCloseModal}
//         />
//       )}
//       {deleteModalOpen && (
//         <DeleteFeedModal
//           onClose={handleDeleteCloseModal}
//           imgUrlList={feedData.imageUrl}
//         />
//       )}
//     </>
//   );
// };

// export default UserCard;
