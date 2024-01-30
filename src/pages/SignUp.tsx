import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useSetProfileImage from '../hook/useSetProfileImage';
import useSignup from '../hook/useSignup';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Label } from '../components/ui/Label';

import ProfileImg from '../assets/Img/Img-user.svg';
import ProfileAddImg from '../assets/Icon/Icon-add-circle.svg';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [displayName, setDisplayName] = useState<null | string>(null);
  const [emailErrMessage, setEmailErrMessage] = useState('');
  const [passwordErrMessage, setPasswordErrMessage] = useState('');
  const [passwordConfirmErrMessage, setPasswordConfirmErrMessage] =
    useState('');
  const [matchPassword, setMatchPassword] = useState(false);
  const [introduce, setIntroduce] = useState<null | string>(null);

  const { file, src, setProfileImage } = useSetProfileImage();
  const { error, signup } = useSignup();
  const gradientStyle = {
    backgroundImage:
      'linear-gradient(113.78deg, rgba(250, 218, 128, 0.4) 21.18%, rgba(243, 117, 37, 0.4) 55.65%, rgba(237, 67, 35, 0.4) 82.73%)',
  };

  useEffect(() => {
    if (error === null) {
      return;
    }

    switch (error) {
      case 'auth/email-already-in-use':
        setEmailErrMessage('이미 사용 중인 이메일입니다');
        break;
      case 'auth/network-request-failed':
        alert('네트워크 연결에 실패했습니다');
        break;
      case 'auth/invalid-email':
        setEmailErrMessage('잘못된 이메일 형식입니다');
        break;
      case 'auth/internal-error':
        alert('잘못된 요청입니다');
        break;
      case 'auth/weak-password':
        setPasswordErrMessage('6자 이상 입력해주세요');
        break;
      default:
        alert('회원가입에 실패했습니다');
    }
  }, [error]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signup({ email, password, displayName, introduce, file });
  };

  const handleEmailInp = (target: HTMLInputElement) => {
    setEmail(target.value);

    if (target.validity.valueMissing) {
      setEmailErrMessage('이메일을 입력해주세요');
    } else {
      setEmailErrMessage('');
    }
  };

  const handlePasswordInp = (target: HTMLInputElement) => {
    setPassword(target.value);
  };

  const handlePasswordConfirmInp = (value: string) => {
    setPasswordConfirm(value);

    if (value !== password) {
      setMatchPassword(false);
      setPasswordConfirmErrMessage('비밀번호가 일치하지 않습니다');
    } else {
      setMatchPassword(true);
      setPasswordConfirmErrMessage('');
    }
  };

  const handleInp = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.id) {
      case 'email-input':
        handleEmailInp(e.target);
        break;
      case 'password-input':
        handlePasswordInp(e.target);
        break;
      case 'passwordConfirm-inp':
        handlePasswordConfirmInp(e.target.value);
        break;
      case 'displayName-inp':
        setDisplayName(e.target.value);
        break;
      case 'introduce':
        setIntroduce(e.target.value);
    }
  };

  return (
    <div
      className="w-screen h-screen  flex items-center justify-center "
      style={gradientStyle}
    >
      <section className="shadow-slate200 w-[600px] max-h-[600px] px-[130px] py-[30px] bg-gray-1 transform translate-x-1/2-translate-y-1/2 rounded-lg flex flex-col items-center ">
        <h2 className="mx-auto text-largeTitle">Sign up</h2>
        <form onSubmit={handleSubmit} className="w-full ">
          <Label
            htmlFor="profile-input"
            className="cursor-pointer overflow-hidden"
          >
            <div className=" w-[100px] h-[100px]  overflow-hidden mx-auto relative mb-7">
              <img
                src={src || ProfileImg}
                alt="프로필 이미지 등록"
                className="object-cover w-[100px] h-[100px] rounded-full"
              />
              <img
                src={ProfileAddImg}
                alt="변경하기"
                className="absolute bottom-0 right-0"
              />
            </div>
          </Label>
          <Input
            id="profile-input"
            type="file"
            className="sr-only"
            onChange={setProfileImage}
          />

          <Label htmlFor="email-input" className="sr-only">
            이메일
          </Label>
          <Input
            type="email"
            id="email-input"
            placeholder="이메일"
            onChange={handleInp}
            required
          />

          <Label htmlFor="password-input" className="sr-only">
            비밀번호
          </Label>
          <Input
            type="password"
            id="password-input"
            placeholder="비밀번호"
            onChange={handleInp}
            required
          />

          <Label htmlFor="passwordConfirm-input" className="sr-only">
            비밀번호 확인
          </Label>
          <Input
            type="password"
            id="passwordConfirm-input"
            placeholder="비밀번호 확인"
            onChange={handleInp}
            required
          />

          <Label htmlFor="displayName-input" className="sr-only">
            닉네임
          </Label>
          <Input
            type="text"
            id="displayName-input"
            placeholder="닉네임"
            onChange={handleInp}
            required
          />

          <Label htmlFor="introduce-input" className="sr-only">
            소개 성경 구절
          </Label>
          <Input
            type="text"
            id="introduce-input"
            placeholder="나의 힘이 되는 성경 구절을 적어 주세요"
            onChange={handleInp}
          />
          <strong role="alert">
            {passwordConfirmErrMessage && `*${passwordConfirmErrMessage}`}
          </strong>
          <Button>완료</Button>
        </form>
        <div className="flex items-center gap-4  pt-7">
          <p className="text-gray-600 text-small ">이미 회원이세요?</p>
          <Link
            to="/login"
            className="font-bold text-gray-900 text-large hover:underline"
          >
            로그인하러 가기
          </Link>
        </div>
      </section>
    </div>
  );
}
