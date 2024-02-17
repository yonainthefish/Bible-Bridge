interface UserFormData<T> {
  email: T | null;
  password: T | null;
  displayName: T | null;
  file: File | null;
  introduce?: string | T | null;
}

export type SignUpProps = UserFormData<string | null>;
export type ProfileProps = UserFormData<string>;
