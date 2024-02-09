import { useState, useEffect, FormEvent } from 'react';

import useAuthContext from '@/hook/useAuthContext';
import useSetProfileImage from '@/hook/useSetProfileImage';
import useReauthenticate from '@/hook/useReauthenticate';
import { useUpdateProfile } from '@/hook/useUpdateProfile';

import ProfileCard from '@/components/cardUi/ProfileCard';
import { Button } from '@/components/ui/button/Button';
import { Input } from '@/components/ui/input/Input';
import { Label } from '@/components/ui/label/Label';

import ProfileImg from '@/assets/Img/Img-user.svg';
import ProfileAddImg from '@/assets/Icon/Icon-add-circle.svg';
import LoadingIcon from '@/assets/Icon/Icon-loading-black.svg';

interface Profile {
  file: File | null;
  displayName: string | null;
  email: string | null;
  password: string | null;
}
export default function Setting() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [displayName, setDisplayName] = useState<null | string>(null);
  const [emailErrMessage, setEmailErrMessage] = useState('');
  const [passwordErrMessage, setPasswordErrMessage] = useState('');
  const [passwordConfirmErrMessage, setPasswordConfirmErrMessage] =
    useState('');
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [matchPassword, setMatchPassword] = useState(false);
  const [changed, setChanged] = useState(false);
  // const [introduce, setIntroduce] = useState<null | string>(null);

  // const [displayNameErrMessage, setDisplayNameErrMessage] = useState('');
  // const [displayNameValid, setDisplayNameValid] = useState(false);
  const [updateProfileIsPending, setUpdateProfileIsPending] = useState(false);
  const { user } = useAuthContext();
  const { setProfile, error: updateProfileError } = useUpdateProfile();
  const { reauthenticate, error: reauthenticateError } = useReauthenticate();

  const { file, setSrc, src, setProfileImage } = useSetProfileImage();

  useEffect(() => {
    const userDisplayName = user?.displayName || '';
    const userPhotoURL = user?.photoURL || '';

    if (
      user?.email !== email ||
      userPhotoURL !== src ||
      userDisplayName !== displayName
    ) {
      setChanged(true);
    } else if (password) {
      setChanged(true);
    } else {
      setChanged(false);
    }
  }, [email, src, displayName, password]);

  useEffect(() => {
    if (user === null) {
      return;
    }
    if (user.email) {
      setEmail(user.email);
    }
    if (user.displayName) {
      setDisplayName(user.displayName);
    }
    if (user.photoURL) {
      setSrc(user.photoURL);
    }

    // 초기화
    setEmailValid(true);
    setPasswordValid(true);
    setMatchPassword(true);
    setChanged(false);
    setPassword('');
    setPasswordConfirm('');
  }, [user]);

  useEffect(() => {
    if (!reauthenticateError) {
      return;
    }

    switch (reauthenticateError) {
      case 'auth/wrong-password':
        alert('비밀번호를 다시 확인해 주세요');
        break;
      case 'auth/too-many-requests':
        alert('잠시 후 다시 시도해 주세요');
        break;
      case 'auth/network-request-failed':
        alert('네트워크 연결에 실패했습니다');
        break;
      case 'auth/internal-error':
        alert('잘못된 요청입니다');
        break;
      default:
        alert('계정 인증에 실패했습니다');
    }

    setChanged(true);
  }, [reauthenticateError]);

  useEffect(() => {
    if (!updateProfileError) {
      return;
    }

    switch (updateProfileError) {
      case 'auth/email-already-in-use':
        setEmailErrMessage('이미 사용 중인 이메일입니다');
        setEmailValid(false);
        break;
      case 'auth/network-request-failed':
        alert('네트워크 연결에 실패했습니다.');
        break;
      case 'auth/invalid-email':
        setEmailErrMessage('잘못된 이메일 형식입니다');
        setEmailValid(false);
        break;
      case 'auth/internal-error':
        alert('잘못된 요청입니다');
        break;
      default:
        alert('프로필 변경에 실패했습니다');
    }

    setChanged(true);
  }, [updateProfileError]);

  const reconfirmPassword = async () => {
    const password = prompt('현재 비밀번호를 입력해주세요');

    if (password === null) {
      alert('비밀번호가 누락되었습니다');
      return false;
    }

    return await reauthenticate(password);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setChanged(false);
    setUpdateProfileIsPending(true);

    // 현재 비밀번호 입력받은 후, 재인증
    if (email !== user?.email || password) {
      const success = await reconfirmPassword();

      if (!success) {
        setUpdateProfileIsPending(false);
        return;
      }
    }

    const profile: Profile = { file, displayName: null, email: null, password };

    if (displayName !== user?.displayName) {
      profile.displayName = displayName;
    }

    if (email !== user?.email) {
      profile.email = email;
    }

    await setProfile(profile);
    setUpdateProfileIsPending(false);
  };

  const handlePasswordInp = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);

    if (e.target.validity.tooShort) {
      setPasswordValid(false);
      setPasswordErrMessage('6자 이상 입력해주세요');
    } else {
      setPasswordValid(true);
      setPasswordErrMessage('');
    }

    if (e.target.value !== passwordConfirm) {
      setMatchPassword(false);
    } else {
      setMatchPassword(true);
      setPasswordConfirmErrMessage('');
    }
  };

  const handlePasswordConfirmInp = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordConfirm(e.target.value);

    if (e.target.value !== password) {
      setMatchPassword(false);
      setPasswordConfirmErrMessage('비밀번호가 일치하지 않습니다');
    } else {
      setMatchPassword(true);
      setPasswordConfirmErrMessage('');
    }
  };

  const handleEmailInp = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);

    if (e.target.validity.valueMissing) {
      setEmailErrMessage('필수 항목입니다');
      setEmailValid(false);
    } else {
      setEmailErrMessage('');
      setEmailValid(true);
    }
  };

  return (
    <main>
      <div className="before-element z-0"></div>
      <div className="flex pl-[70px] pr-[150px] pt-[100px] gap-10 z-10">
        <section className="relative">
          <ProfileCard />
        </section>
        <section className="w-[1000px] bg-gray-400 relative">
          <h2 className="text-gray-100 text-left text-md">Profile Setting</h2>
          <div className="w-[80%] mx-auto">
            <form onSubmit={handleSubmit} className="w-full mx-auto">
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
                value={email}
                onChange={handleEmailInp}
                required
              />
              <div style={{ position: 'relative' }}>
                <strong
                  role="alert"
                  className={`text-error text-smaller ${
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
                id="password-inp"
                placeholder="비밀번호 (6자 이상 입력해주세요)"
                value={password}
                onChange={handlePasswordInp}
                required
              />
              <div style={{ position: 'relative' }}>
                <strong
                  role="alert"
                  className={`text-error text-smaller   ${
                    passwordErrMessage ? 'visible' : 'invisible'
                  }`}
                  style={{ position: 'absolute', left: '10px', top: '-17px' }}
                >
                  {passwordErrMessage && `*${passwordErrMessage}`}
                </strong>
              </div>

              <Label htmlFor="passwordConfirm-input" className="sr-only">
                비밀번호 확인
              </Label>
              <Input
                type="password"
                id="password-inp"
                placeholder="비밀번호 확인"
                value={passwordConfirm}
                onChange={handlePasswordConfirmInp}
                required
              />
              <div style={{ position: 'relative' }}>
                <strong
                  role="alert"
                  className={`text-error text-smaller   ${
                    passwordConfirmErrMessage ? 'visible' : 'invisible'
                  }`}
                  style={{ position: 'absolute', left: '10px', top: '-17px' }}
                >
                  {passwordConfirmErrMessage && `*${passwordConfirmErrMessage}`}
                </strong>
              </div>

              <Label htmlFor="displayName-input" className="sr-only">
                닉네임
              </Label>
              <Input
                type="text"
                id="displayName-input"
                placeholder="닉네임 (2자 ~ 15자 내외)"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                required
              />
              <div style={{ position: 'relative' }}>
                {/* <strong
                  role="alert"
                  className={`text-error text-smaller   ${
                    displayNameErrMessage ? 'visible' : 'invisible'
                  }`}
                  style={{ position: 'absolute', left: '10px', top: '-17px' }}
                >
                  {displayNameErrMessage && `*${displayNameErrMessage}`}
                </strong> */}
              </div>
              {/* <Label htmlFor="introduce-input" className="sr-only">
                소개 성경 구절
              </Label>
              <Input
                type="text"
                id="introduce-input"
                placeholder="나의 힘이 되는 성경 구절을 적어 주세요"
                onChange={handleInp}
              /> */}

              <Button
                className={`${
                  !emailValid || !passwordValid || !matchPassword || !changed
                    ? 'opacity-30 cursor-not-allowed'
                    : ''
                }`}
              >
                {updateProfileIsPending ? (
                  <img src={LoadingIcon} alt="계정 생성 중" />
                ) : (
                  '프로필 수정 완료'
                )}
              </Button>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}
