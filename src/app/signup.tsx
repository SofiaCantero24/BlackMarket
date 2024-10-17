import { useRouter } from 'expo-router';
import { showMessage } from 'react-native-flash-message';

import { useSignup } from '@/api/auth/use-signup';
import { SignupForm } from '@/components/signup-form';
import type { SingupFormProps } from '@/types/auth/auth-types';
import { FocusAwareStatusBar, showErrorMessage } from '@/ui';

export default function Signup() {
  const router = useRouter();

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
        onSuccess: () => {
          showMessage({
            message: 'success',
            type: 'success',
          });
          router.push('/(app)');
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
