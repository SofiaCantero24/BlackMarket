export type SignupResponse = {
  status: 'succes' | 'error';
  data: Data;
  errors?: Errors;
};

export type SigninRespose = {
  data: Data;
};

type Data = {
  email: string;
  provider: string;
  uid: string;
  id: number | null;
  allow_password_change: boolean;
  name: string;
  nickname: any | null;
  image: any | null;
  created_at: string | null;
  updated_at: string | null;
  birthday: any | null;
};

type Errors = {
  email: string[];
  full_messages: string[];
  password: string[];
  password_confirmation: string[];
};
