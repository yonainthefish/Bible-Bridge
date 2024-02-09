import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { appFireStore } from '@/firebase/config';

interface User {
  id: string;
  displayName: string;
  photoURL?: string;
  introduce?: string;
}

export default function Explore() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(appFireStore, 'users'));
        const usersList: User[] = [];
        querySnapshot.forEach((doc) => {
          // 각 문서의 데이터를 usersList 배열에 추가
          usersList.push({ id: doc.id, ...(doc.data() as User) });
        });
        setUsers(usersList);
      } catch (err) {
        console.error('Error fetching users: ', err);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="w-[100px]">
      {users.map((user) => (
        <div key={user.id}>
          {user.photoURL && <img src={user.photoURL} alt="Profile" />}
          <h2>{user.displayName}</h2>
          <p>{user.introduce}</p>
        </div>
      ))}
    </div>
  );
}
