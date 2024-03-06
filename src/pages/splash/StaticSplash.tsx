import LogoImg from '@/assets/Img/Logo-big.svg';

export default function StaticSplash() {
  return (
    <div className="h-[100vh] flex justify-center items-center">
      <img src={LogoImg} alt="바이블브릿지로고" />
    </div>
  );
}
