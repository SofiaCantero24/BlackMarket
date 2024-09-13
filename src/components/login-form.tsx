import { zodResolver } from '@hookform/resolvers/zod';
import images from 'assets';
import { ImageBackground as RNImageBackground } from 'expo-image';
import { Link } from 'expo-router';
import { cssInterop } from 'nativewind';
import { useForm } from 'react-hook-form';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';

import {
  type InputConstantsProps,
  type InputProps,
  type InputVariableProps,
  type LoginFormProps,
  type LoginFormType,
} from '@/types/auth/auth-types';
import { loginSchema } from '@/types/auth/auth-types';
import { Button, ControlledInput, Image, Text, View } from '@/ui';

const ImageBackground = cssInterop(RNImageBackground, { className: 'style' });

const TopImageLogo = () => {
  return (
    <View className="mb-8 items-center">
      <Image
        contentFit="contain"
        className="mt-4 h-12 w-48"
        source={images.authLogo()}
      />
    </View>
  );
};

const BottomTextComponenent = () => {
  return (
    <View className="items-center justify-center rounded-lg bg-white p-4">
      <Text className="font-medium">Don't have an account?</Text>
      <Link href="/signup" asChild>
        <Button
          testID="signin-button"
          label="Sing up"
          className="h-12 w-full rounded-lg border-black"
          variant="outline"
        />
      </Link>
    </View>
  );
};

const ErrorMessageComponent = ({ showError }: { showError: boolean }) => {
  return (
    <View className="items-center">
      {showError && (
        <Text className="mb-1 mt-2 w-4/5 text-center font-bold text-error">
          Sorry! Your email or password are incorrect.
        </Text>
      )}
    </View>
  );
};

const renderInput = ({ inputVariables, inputConstants }: InputProps) => (
  <ControlledInput
    key={inputVariables.name}
    testID={`${inputVariables.name}-input`}
    name={inputVariables.name}
    label={inputVariables.label}
    placeholder={inputVariables.placeholder}
    secureTextEntry={inputVariables.secureTextEntry}
    {...inputConstants}
  />
);

export const LoginForm = ({ onSubmit = () => {} }: LoginFormProps) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormType>({
    resolver: zodResolver(loginSchema),
  });

  const hasErrors = Object.keys(errors).length > 0;

  const inputConstants: InputConstantsProps = {
    control,
    className: 'mb-2 rounded-lg border bg-white p-3 w-full',
    labelClassname: 'font-semibold',
    showError: false,
  };

  const inputProps: InputVariableProps[] = [
    {
      name: 'email',
      label: 'Email',
      placeholder: 'Type your email or telephone',
    },
    {
      name: 'password',
      label: 'Password',
      placeholder: 'Type your password',
      secureTextEntry: true,
    },
  ];

  return (
    <ImageBackground className="flex-1" source={images.backgroundAuth()}>
      <KeyboardAvoidingView
        className="flex-1"
        behavior="padding"
        keyboardVerticalOffset={-150}
      >
        <View className="flex-1 justify-center p-4 px-8">
          <View className="mb-4 rounded-lg bg-white p-4">
            <TopImageLogo />
            {inputProps.map((inputVariable) =>
              renderInput({ inputVariables: inputVariable, inputConstants })
            )}
            <Button
              testID="login-button"
              label="Log in"
              onPress={handleSubmit(onSubmit)}
              className="mb-2 h-14 w-full rounded-lg text-base font-medium"
            />
            <ErrorMessageComponent showError={hasErrors} />
            <View className="items-center">
              <Text className="mt-2 text-base font-bold text-link">
                I forgot my password
              </Text>
            </View>
          </View>
          <BottomTextComponenent />
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};
