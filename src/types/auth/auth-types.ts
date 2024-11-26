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
  name: z.string({
    required_error: 'Name is required',
  }),
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
  password_confirmation: z
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
  name: 'name' | 'email' | 'password' | 'password_confirmation';
  label: string;
  placeholder: string;
  secureTextEntry?: boolean;
};

export type InputProps = {
  inputVariables: InputVariableProps;
  inputConstants: InputConstantsProps;
};

export const addressSchema = z.object({
  city: z.string({
    required_error: 'City required',
  }),
  country: z.string({
    required_error: 'Country required',
  }),
  address1: z.string({
    required_error: 'Address required',
  }),
  address2: z.string().optional(),
  postalCode: z.string({
    required_error: 'Postal Code required',
  }),
});

const cardSchema = z.object({
  cardNumber: z.string({
    required_error: 'Card number required',
  }),
  cvcCode: z.string({
    required_error: 'CVC code required',
  }),
});

const paymentSchema = addressSchema.and(cardSchema);

export type PaymentFormType = z.infer<typeof paymentSchema>;

export type PaymentFormProps = {
  onSubmit?: SubmitHandler<PaymentFormType>;
};
