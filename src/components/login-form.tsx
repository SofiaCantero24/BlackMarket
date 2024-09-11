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
});

export type FormType = z.infer<typeof schema>;

export type LoginFormProps = {
  onSubmit?: SubmitHandler<FormType>;
};

export const LoginForm = ({ onSubmit = () => {} }: LoginFormProps) => {
  const { handleSubmit, control } = useForm<FormType>({
    resolver: zodResolver(schema),
  });
  return (
    <Image className="flex-1" source={images.backgroundAuth()}>
      <KeyboardAvoidingView
        className="flex-1"
        behavior="padding"
        keyboardVerticalOffset={10}
      >
        <View className="flex-1 justify-center p-4 px-8">
          <View className="mb-4 rounded-lg bg-white p-4">
            <View className="mb-8 items-center">
              <Image
                contentFit="contain"
                className="h-16 w-48"
                source={images.authLogo()}
              />
            </View>

            <ControlledInput
              testID="email-input"
              control={control}
              name="email"
              label="Email"
              placeholder="Type your email or telephone"
              className="text-md mb-2 rounded-lg border bg-white p-3"
              labelClassname="font-semibold"
            />
            <ControlledInput
              testID="password-input"
              control={control}
              name="password"
              label="Password"
              placeholder="Type your password"
              secureTextEntry={true}
              className="mb-2 rounded-lg border bg-white p-3"
              labelClassname="font-semibold"
            />
            <Button
              testID="login-button"
              label="Log in"
              onPress={handleSubmit(onSubmit)}
              className="mb-4 h-14 w-full rounded-lg text-base font-medium"
            />
            <View className="items-center">
              <Text className="text-base font-bold text-[#076CE0]">
                I forgot my password
              </Text>
            </View>
          </View>
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
        </View>
      </KeyboardAvoidingView>
    </Image>
  );
};
