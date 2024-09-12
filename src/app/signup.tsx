import { useRouter } from 'expo-router';

import type { LoginFormProps } from '@/components/login-form';
import { SignupForm } from '@/components/signup-form';
import { useAuth } from '@/core';
import { FocusAwareStatusBar } from '@/ui';

export default function Signup() {
  const router = useRouter();
  const signIn = useAuth.use.signIn();

  const onSubmit: LoginFormProps['onSubmit'] = (data) => {
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
