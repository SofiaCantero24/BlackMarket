import { useRouter } from 'expo-router';
import { showMessage } from 'react-native-flash-message';

import { useSignup } from '@/api/auth/use-signup';
import { SignupForm } from '@/components/signup-form';
import { useAuth } from '@/core';
import type { SingupFormProps } from '@/types/auth/auth-types';
import { FocusAwareStatusBar, showErrorMessage } from '@/ui';

export default function Signup() {
  const router = useRouter();
  const signIn = useAuth.use.signIn();

  const { mutate: signup, error } = useSignup();

  const onSubmit: SingupFormProps['onSubmit'] = (data) => {
    signup(
      {
        user: {
          email: data.email,
          name: data.name,
          password: data.password,
          password_confirmation: data.password_confirmation,
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
          showErrorMessage(error?.cause?.message);
        },
      }
    );
  };
  return (
    <>
      <FocusAwareStatusBar />
      <SignupForm onSubmit={onSubmit} />
    </>
  );
}
