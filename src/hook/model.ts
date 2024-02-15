interface UserFormData<T> {
  email: T;
  password: T;
  displayName: T;
  file: File | T;
  introduce?: string | T;
}

export type SignUpProps = UserFormData<string | null>;
export type Profile = UserFormData<null>;
