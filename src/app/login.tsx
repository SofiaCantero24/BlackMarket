import { useRouter } from 'expo-router';
import { showMessage } from 'react-native-flash-message';

import { useSignin } from '@/api/auth/use-singin';
import { LoginForm } from '@/components/login-form';
import type { LoginFormProps } from '@/types/auth/auth-types';
import { FocusAwareStatusBar, showErrorMessage } from '@/ui';

export default function Login() {
  const router = useRouter();

  const { mutate: signin, error } = useSignin();

  const onSubmit: LoginFormProps['onSubmit'] = (data) => {
    signin(
      {
        user: {
          email: data.email,
          password: data.password,
        },
      },
      {
        onSuccess: () => {
          showMessage({
            message: 'success',
            type: 'success',
          });

          router.push('/(app)');
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
