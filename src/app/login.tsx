import { useRouter } from 'expo-router';
import { showMessage } from 'react-native-flash-message';

import { useSignin } from '@/api/auth/use-singin';
import { LoginForm } from '@/components/login-form';
import { useAuth } from '@/core';
import type { LoginFormProps } from '@/types/auth/auth-types';
import { FocusAwareStatusBar, showErrorMessage } from '@/ui';

export default function Login() {
  const router = useRouter();
  const signIn = useAuth.use.signIn();

  const { mutate: singin, error } = useSignin();

  const onSubmit: LoginFormProps['onSubmit'] = (data) => {
    singin(
      {
        user: {
          email: data.email,
          password: data.password,
        },
      },
      {
        onSuccess: (response) => {
          showMessage({
            message: 'succes',
            type: 'success',
          });

          const authorizationHeader = response.headers.authorization;

          if (authorizationHeader) {
            signIn(authorizationHeader.toString());
            router.push('/(app)');
          }
        },
        onError: () => {
          showErrorMessage(error?.error);
        },
      }
    );
  };
  return (
    <>
      <FocusAwareStatusBar />
      <LoginForm onSubmit={onSubmit} />
    </>
  );
}
