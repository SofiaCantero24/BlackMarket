import type { SubmitHandler } from 'react-hook-form';
import { z } from 'zod';

// Login schema
export const loginSchema = z.object({
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

export type LoginFormType = z.infer<typeof loginSchema>;

export type LoginFormProps = {
  onSubmit?: SubmitHandler<LoginFormType>;
};

// Signup schema
export const signupSchema = z.object({
  name: z
    .string({
      required_error: 'Name is required',
    })
    .email('Invalid Name format'),
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

export type SignupFormType = z.infer<typeof signupSchema>;

export type SingupFormProps = {
  onSubmit?: SubmitHandler<SignupFormType>;
};

// Input types
export type InputConstantsProps = {
  control: any;
  className: string;
  labelClassname: string;
  showError: boolean;
};

export type InputVariableProps = {
  name: 'name' | 'email' | 'password' | 'confirmPassword';
  label: string;
  placeholder: string;
  secureTextEntry?: boolean;
};

export type InputProps = {
  inputVariables: InputVariableProps;
  inputConstants: InputConstantsProps;
};
