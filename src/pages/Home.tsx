import React from 'react';
import { Calendar } from '@/components/ui/Calendar';
import FeedUi from '@/components/cardUi/FeedItemCard';
export default function Home() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <main className="grid grid-cols-2 gap-4 mt-[60px] ">
      <section className="border-gray-700 border-2 bg-gray-500">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border w-full"
        />
      </section>
      <section className="bg-gray-600">
        <FeedUi />
      </section>
    </main>
  );
}
