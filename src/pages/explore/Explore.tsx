import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { appFireStore } from '@/firebase/config';
import FollowCard from '@/components/followUi/FollowCard';

interface User {
  id: string;
  displayName: string;
  photoURL?: string;
  introduce?: string;
  uniqueId: string;
}

export default function Explore() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(appFireStore, 'users'));
        const usersList: User[] = [];
        querySnapshot.forEach((doc) => {
          console.log(doc.id);

          usersList.push({ ...(doc.data() as User), uniqueId: doc.id });
        });
        setUsers(usersList);
      } catch (err) {
        console.error('Error fetching users: ', err);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      {users.map((user) => (
        <FollowCard
          key={user.uniqueId}
          userId={user.uniqueId}
          displayName={user.displayName}
          photoURL={user.photoURL}
        />
      ))}
    </div>
  );
}
