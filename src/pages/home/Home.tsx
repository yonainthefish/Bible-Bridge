import FeedUi from '@/components/feedUi/FeedItemCard';
import TopButton from '@/components/commonUi/topButton/TopButton';

export default function Home() {
  return (
    <>
      <main className="w-[100%] flex mx-auto pt-2 min-h-screen">
        <section className="flex-1">
          <div className="w-[70%] mx-auto"></div>
        </section>
        <section className="flex-1  border-l">
          <div className="w-[70%] mx-auto ">
            <FeedUi />
          </div>
        </section>
      </main>
      <TopButton />
    </>
  );
}
