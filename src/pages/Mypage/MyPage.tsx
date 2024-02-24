import { useParams } from 'react-router-dom';

import ProfileCard from '@/components/profileUi/ProfileCard';
import UserFeeds from '@/components/feedUi/UserFeeds';
import '@/pages/myPage/myPage.css';

const MyPage = () => {
  const { userId } = useParams();

  return (
    <main className="h-[100vh] ">
      <div className="beforeElement z-0"></div>
      <div className="flex px-[70px] pt-[100px] gap-10 z-10">
        <section className="relative">
          <ProfileCard />
        </section>
        <section className="w-full relative ">
          <div className="mt-[80px] mb-[30px] text-left text-gray-900 relative">
            나의 전체묵상
            <div className="bottomLine"></div>
          </div>
          <section className="flex flex-wrap border">
            <UserFeeds userId={userId} />
          </section>
        </section>
      </div>
    </main>
  );
};

export default MyPage;
