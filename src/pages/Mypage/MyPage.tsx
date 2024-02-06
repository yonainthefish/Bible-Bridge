import { useState } from 'react';

import ProfileCard from '@/components/cardUi/ProfileCard';
import './MyPage.css';
import FeedUi from '@/components/cardUi/FeedUi';
import { Calendar } from '@/components/ui/Calendar';

type ContentType = 'calendar' | 'meditation';

interface ButtonInfo {
  type: ContentType;
  label: string;
}

export default function MyPage() {
  const [selectedContent, setSelectedContent] =
    useState<ContentType>('calendar');
  const buttons: ButtonInfo[] = [
    { type: 'calendar', label: '달력' },
    { type: 'meditation', label: '전체묵상' },
  ];

  const handleBtnClick = (content: ContentType) => {
    setSelectedContent(content);
  };

  return (
    <main className="h-[100vh] ">
      <div className="before-element z-0"></div>
      <div className="flex pl-[70px] pr-[150px] pt-[100px] gap-10 z-10">
        <section className="relative">
          <ProfileCard />
        </section>
        <section className="w-[1000px] h-[1000px] bg-gray-400 relative">
          <div className="mt-[180px] text-left">
            {buttons.map((button) => (
              <button
                key={button.type}
                className={`mx-4 ${
                  selectedContent === button.type ? 'font-bold' : ''
                }`}
                onClick={() => handleBtnClick(button.type)}
              >
                {button.label}
              </button>
            ))}
          </div>
          <div className="bg-gray-100 mt-5">
            {selectedContent === 'calendar' ? <Calendar /> : null}
            {selectedContent === 'meditation' ? <FeedUi /> : null}
          </div>
        </section>
      </div>
    </main>
  );
}
