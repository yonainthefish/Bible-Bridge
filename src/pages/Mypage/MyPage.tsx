import ProfileCard from '@/components/profileUi/ProfileCard';
import FeedItemCard from '@/components/feedUi/FeedItemCard';
import '@/pages/myPage/myPage.css';

export default function myPage() {
  return (
    <main className="h-[100vh] ">
      <div className="beforeElement z-0"></div>
      <div className="flex px-[70px] pt-[100px] gap-10 z-10">
        <section className="relative">
          <ProfileCard />
        </section>
        <section className="w-full relative ">
          <div className="mt-[80px] mb-[30px] text-left text-gray-900 relative">
            전체묵상
            <div className="bottomLine"></div>
          </div>

          <div className="w-[250px] ">
            <FeedItemCard />
          </div>
        </section>
      </div>
    </main>
  );
}
