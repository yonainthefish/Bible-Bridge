import { Timestamp } from 'firebase/firestore';

export interface User {
  userId: string;
  displayName?: string | undefined;
  photoURL?: string;
}

export interface FeedItem extends User {
  id: string;
  title: string;
  text: string;
  timestamp: Timestamp;
  imageUrl?: string;
  authorPhotoURL?: string;
  authorDisplayName: string;
}

export interface ListProps<T> {
  title?: string;
  userList: T[];
  updateFollowLists?: () => void;
}

export interface FollowCardProps {
  userId: string;
  displayName: string | undefined;
  photoURL?: string;
  updateFollowLists?: () => void;
}
