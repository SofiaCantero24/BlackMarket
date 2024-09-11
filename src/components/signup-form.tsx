import { zodResolver } from '@hookform/resolvers/zod';
import images from 'assets/index';
import { Link } from 'expo-router';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import z from 'zod';

import { Button, ControlledInput, Image, Text, View } from '@/ui';

const schema = z.object({
  name: z.string().optional(),
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email('Invalid email format'),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(6, 'Password must be at least 6 characters'),
  confirmPassword: z
    .string({
      required_error: 'Confirm password is required',
    })
    .min(6, 'Confirm Password must be at least 6 characters'),
});

export type FormType = z.infer<typeof schema>;

export type SingupFormProps = {
  onSubmit?: SubmitHandler<FormType>;
};

type InputPropsType = {
  name: 'name' | 'email' | 'password' | 'confirmPassword';
  label: string;
  placeholder: string;
  secureTextEntry?: boolean;
};

const BottomTextComponenent = () => {
  return (
    <View className="items-center">
      <Text className="mb-4 w-3/4 items-center text-center text-base font-normal">
        By signing up, you accept the
        <Text className="text-link font-bold"> Data Policy.</Text>
      </Text>
      <Text className="mb-2 items-center text-center text-base font-normal">
        Already have an account?
        <Link href="/login">
          <Text className="text-link font-bold"> Log in</Text>
        </Link>
      </Text>
    </View>
  );
};

const TopImageLogo = () => {
  return (
    <View className="mb-8 items-center">
      <Image
        contentFit="contain"
        className="h-16 w-48"
        source={images.authLogo()}
      />
    </View>
  );
};

export const SignupForm = ({ onSubmit = () => {} }: SingupFormProps) => {
  const { handleSubmit, control } = useForm<FormType>({
    resolver: zodResolver(schema),
  });

  const inputConstants = {
    control,
    className: 'mb-2 rounded-lg border bg-white p-3',
    labelClassname: 'font-semibold',
  };

  const inputProps: InputPropsType[] = [
    {
      name: 'email',
      label: 'Email',
      placeholder: 'Type your email or telephone',
    },
    { name: 'name', label: 'Full Name', placeholder: 'Type your full name' },
    {
      name: 'password',
      label: 'Password',
      placeholder: 'Type your password',
      secureTextEntry: true,
    },
    {
      name: 'confirmPassword',
      label: 'Confirm Password',
      placeholder: 'Re-type your password',
      secureTextEntry: true,
    },
  ];

  return (
    <Image className="flex-1" source={images.backgroundAuth()}>
      <KeyboardAvoidingView
        className="flex-1"
        behavior="padding"
        keyboardVerticalOffset={10}
      >
        <View className="flex-1 justify-center p-4 px-8">
          <View className="mb-4 rounded-lg bg-white p-4">
            <TopImageLogo />
            {inputProps.map(({ name, label, placeholder, secureTextEntry }) => (
              <ControlledInput
                key={name}
                testID={`${name}-input`}
                name={name}
                label={label}
                placeholder={placeholder}
                secureTextEntry={secureTextEntry}
                {...inputConstants}
              />
            ))}
            <Button
              testID="signup-button"
              label="Sign up"
              onPress={handleSubmit(onSubmit)}
              className="mb-4 h-14 w-full rounded-lg text-base font-medium"
            />
            <BottomTextComponenent />
          </View>
        </View>
      </KeyboardAvoidingView>
    </Image>
  );
};
