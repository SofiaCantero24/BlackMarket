import type { AxiosResponse } from 'axios';
import { createMutation } from 'react-query-kit';

import { client } from '../common';
import type { SigninRespose } from './types';

type User = {
  email: string;
  password: string;
};

type Response = AxiosResponse<SigninRespose>;
type Error = {
  error: string;
};

type Request = {
  user: User;
};

export const useSignin = createMutation<Response, Request, Error>({
  mutationFn: async (variables) =>
    client({
      url: 'users/sign_in',
      method: 'POST',
      data: variables,
    }),
});
