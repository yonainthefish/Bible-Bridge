export interface Props {
  email: string;
  password: string;
  displayName: string | null;
  file: File | null;
  introduce: string | null;
}

export interface Profile {
  email: string | null;
  password: string | null;
  displayName: string | null;
  file: File | null;
}
