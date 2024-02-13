import { Timestamp } from 'firebase/firestore';

export interface User {
  userId: string;
  displayName: string;
  photoURL?: string;
}

export interface UserListProps {
  userList: User[];
  title: string;
}

export interface FollowCardProps {
  userId: string;
  displayName: string;
  photoURL?: string;
}

export interface FeedItem {
  id: string;
  title: string;
  text: string;
  timestamp: Timestamp;
  imageUrl?: string;
  userId?: string | undefined;
  authorPhotoURL?: string;
  authorDisplayName?: string;
}
