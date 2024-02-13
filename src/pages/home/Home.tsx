import React from 'react';
import { Calendar } from '@/components/commonUi/calendar/Calendar';
import FeedUi from '@/components/cardUi/FeedItemCard';
import TopButton from '@/components/commonUi/topButton/TopButton';
export default function Home() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <div className="mx-16 relative">
      <main className="flex">
        <section className="w-[50%] h-[100vh] bg-gray-100 fixed">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="w-[50%] rounded-md mx-auto"
          />
        </section>
        <section className="w-[50%] absolute top-0 right-0  bg-gray-300">
          <div className="w-[300px] px-[20px] bg-gray-700 mx-auto">
            <FeedUi />
          </div>
        </section>
      </main>
      <TopButton />
    </div>
  );
}
