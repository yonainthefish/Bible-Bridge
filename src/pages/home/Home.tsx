import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import DateFormatter from '@/components/commonUi/date/DateFomatter';
import FeedUi from '@/components/feedUi/FeedItemCard';
import TopButton from '@/components/commonUi/topButton/TopButton';

export default function Home() {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (newValue) => {
    setDate(newValue);
  };

  return (
    <>
      <main className="w-[100%] flex mx-auto pt-2 min-h-screen">
        <section className="flex-1">
          <div className="w-[70%] mx-auto">
            <Calendar
              onChange={handleDateChange}
              value={date}
              className={'fixed'}
            />
          </div>
        </section>
        <section className="flex-1 ">
          <div className="w-[70%] mx-auto ">
            <FeedUi />
            <DateFormatter date={date} />
          </div>
        </section>
      </main>
      <TopButton />
    </>
  );
}
