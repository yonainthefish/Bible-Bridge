import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { useLogin } from '../hook/useLogin';

import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Label } from '../components/ui/Label';

import LogoImg from '../assets/Img/Logo-small.svg';
import LogoText from '../assets/Img/Logo-text-small.svg';
import googleIcon from '../assets/Img/Img-google.svg';
import githubIcon from '../assets/Img/Img-github.svg';
import kakaoIcon from '../assets/Img/Img-kakao.svg';
import LoadingIcon from '@/assets/Icon/Icon-loading-black.svg';

export default function LogIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [emailErrMessage, setEmailErrMessage] = useState('');
  const [passwordErrMessage, setPasswordErrMessage] = useState('');
  const [loginErrMessage, setLoginErrMessage] = useState('');
  const gradientStyle = {
    backgroundImage:
      'linear-gradient(113.78deg, rgba(250, 218, 128, 0.4) 21.18%, rgba(243, 117, 37, 0.4) 55.65%, rgba(237, 67, 35, 0.4) 82.73%)',
  };

  const { login, error, isPending } = useLogin();
  

  useEffect(() => {
    if (error === null) {
  
      return;
    }

    switch (error) {
      case 'auth/invalid-login-credentials':
        setLoginErrMessage('아이디 혹은 비밀번호가 일치하지 않습니다');
        break;
      case 'auth/user-not-found':
        setLoginErrMessage('존재하지 않는 계정입니다');
        break;
      case 'auth/wrong-password':
        setPasswordErrMessage('비밀번호를 다시 확인해주세요');
        setPasswordValid(false);
        break;
      case 'auth/network-request-failed':
        alert('네트워크 연결에 실패했습니다');
        break;
      case 'auth/internal-error':
        alert('잘못된 요청입니다');
        break;
      case 'auth/too-many-requests':
        setLoginErrMessage(
          '여러 번 로그인에 실패하여 해당 계정에 대한 로그인이 비활성화되었습니다. 나중에 다시 시도해 주세요',
        );
        break;
      default:
        setLoginErrMessage('아이디 혹은 비밀번호를 확인해주세요');
    }
  }, [error]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(email, password);
  };

  const handleEmailInp = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setLoginErrMessage('');

    if (e.target.validity.valueMissing) {
      setEmailValid(false);
      setEmailErrMessage('이메일을 입력해주세요');
    } else if (e.target.validity.typeMismatch) {
      setEmailValid(false);
      setEmailErrMessage('이메일 형식이 올바르지 않습니다');
    } else {
      setEmailValid(true);
      setEmailErrMessage('');
    }
  };

  const handlePasswordInp = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setLoginErrMessage('');

    if (e.target.validity.valueMissing) {
      setPasswordValid(false);
      setPasswordErrMessage('비밀번호를 입력해주세요');
    } else {
      setPasswordValid(true);
      setPasswordErrMessage('');
    }
  };

  return (
    <div
      className="w-screen h-screen flex items-center justify-center "
      style={gradientStyle}
    >
      <section className="shadow-slate200 w-[600px] max-h-[800px] px-[130px] py-[50px] bg-gray-1 transform translate-x-1/2-translate-y-1/2 rounded-lg flex flex-col items-center overflow-hidden">
        <h1 className="mx-auto mb-6">
          <img
            className="mx-auto"
            src={LogoImg}
            alt="바이블브릿지 일러스트 로고"
          />
          <img src={LogoText} alt="바이블브릿지 텍스트 로고" />
        </h1>

        <form className="w-[100%]" onSubmit={handleSubmit}>
          <Label htmlFor="email-input" className="sr-only">
            이메일
          </Label>
          <Input
            type="email"
            id="email-input"
            placeholder="이메일"
            required
            onChange={handleEmailInp}
          />
          <div style={{ position: 'relative' }}>
            <strong
              role="alert"
              className={`text-error text-smaller   ${
                emailErrMessage ? 'visible' : 'invisible'
              }`}
              style={{ position: 'absolute', left: '10px', top: '-17px' }}
            >
              {emailErrMessage && `*${emailErrMessage}`}
            </strong>
          </div>

          <Label htmlFor="password-input" className="sr-only">
            비밀번호
          </Label>
          <Input
            type="password"
            id="password-input"
            placeholder="비밀번호"
            required
            onChange={handlePasswordInp}
          />
          <div>
            <strong
              role="alert"
              className={`text-error text-smaller
              ${
                passwordErrMessage || loginErrMessage ? 'visible' : 'invisible'
              }`}
            >
              {passwordErrMessage
                ? `*${passwordErrMessage}`
                : loginErrMessage
                ? `*${loginErrMessage}`
                : ''}
            </strong>
          </div>
          <Button
            className={`${
              !emailValid || !passwordValid || isPending
                ? 'opacity-30 cursor-not-allowed'
                : ''
            }`}
          >
            {isPending ? <img src={LoadingIcon} alt="로그인 중" /> : '로그인'}
          </Button>
        </form>

        <p className="w-[100%] mt-12 text-small text-gray-600 bg-gray-basic-700">
          간편 로그인
        </p>
        <div className="flex gap-5 m-5">
          <a href="">
            <img
              className="w-[52px]"
              src={googleIcon}
              alt="구글 계정으로 로그인"
            />
          </a>
          <a href="">
            <img
              className="w-[52px]"
              src={githubIcon}
              alt="깃헙 계정으로 로그인"
            />
          </a>
          <a href="">
            <img
              className="w-[52px]"
              src={kakaoIcon}
              alt="카카오 계정으로 로그인"
            />
          </a>
        </div>

        <div className="flex items-center gap-4">
          <p className="text-gray-600 text-small ">아직 회원이 아니세요?</p>
          <Link
            to="/signup"
            className="font-bold text-gray-900 text-large hover:underline"
          >
            회원가입 하기
          </Link>
        </div>
      </section>
    </div>
  );
}
