import type { AxiosError, AxiosResponse } from 'axios';
import { createMutation } from 'react-query-kit';

import { client } from '../common';
import type { SignupResponse } from './types';

type User = {
  email: string;
  name: string;
  password: string;
  password_confirmation: string;
};

type Response = AxiosResponse<SignupResponse>;
type Error = AxiosError<SignupResponse>;

type Request = {
  user: User;
};

export const useSignup = createMutation<Response, Request, Error>({
  mutationFn: async (variables) =>
    client({
      url: 'users',
      method: 'POST',
      data: variables,
    }),
});
