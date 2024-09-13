import { useRouter } from 'expo-router';

import { SignupForm } from '@/components/signup-form';
import { useAuth } from '@/core';
import type { SingupFormProps } from '@/types/auth/auth-types';
import { FocusAwareStatusBar } from '@/ui';

export default function Signup() {
  const router = useRouter();
  const signIn = useAuth.use.signIn();

  const onSubmit: SingupFormProps['onSubmit'] = (data) => {
    console.log(data);
    signIn({ access: 'access-token', refresh: 'refresh-token' });
    router.push('/');
  };
  return (
    <>
      <FocusAwareStatusBar />
      <SignupForm onSubmit={onSubmit} />
    </>
  );
}
