import React from 'react';

import ProfileCard from '@/components/card/ProfileCard';
import './MyPage.css';

export default function MyPage() {
  return (
    <>
      <main className="h-[100vh] ">
        <div className="before-element z-0"></div>
        <div className="flex pl-[70px] pr-[150px] pt-[150px] gap-10 z-10">
          <section className="relative">
            <ProfileCard />
          </section>
          <section className="w-[1000px] h-[1000px] bg-gray-400 relative">
            <div className="mt-[180px] text-left">
              <button className="mx-4 ">달력</button>
              <button className="mx-4">전체묵상</button>
            </div>
            <div className="bg-gray-100 mt-5">게시글, 달력 input 부분</div>
          </section>
        </div>
      </main>
    </>
  );
}
