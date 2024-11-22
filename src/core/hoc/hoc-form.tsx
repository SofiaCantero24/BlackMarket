import { zodResolver } from '@hookform/resolvers/zod';
import { forwardRef, useImperativeHandle } from 'react';
import type {
  DefaultValues,
  FieldValues,
  SubmitErrorHandler,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormProps,
  UseFormReset,
  UseFormReturn,
} from 'react-hook-form';
import { useForm, useFormState } from 'react-hook-form';
import { TextInput } from 'react-native';
import type { z } from 'zod';

export type BaseFormProps<T extends FieldValues> = {
  onSubmitHandler: SubmitHandler<T>;
  onSubmitErrorHandler?: SubmitErrorHandler<T>;
  disabled?: boolean;
  defaultValues?: T;
};

const withFormHOC = <T extends FieldValues>(
  {
    schema,
    config,
  }: {
    schema: z.ZodType<T>;
    config: UseFormProps<T>;
  },
  WrappedComponent: React.ComponentType<{
    formMethods: UseFormReturn<T>;
    disabled?: boolean;
  }>
) => {
  return forwardRef(
    (
      {
        onSubmitHandler,
        onSubmitErrorHandler,
        disabled,
        defaultValues,
      }: BaseFormProps<T>,
      ref
    ) => {
      const formMethods = useForm<T>({
        resolver: zodResolver(schema),
        defaultValues: defaultValues as DefaultValues<T>,
        ...config,
      });

      const { handleSubmit } = formMethods;

      const { dirtyFields } = useFormState({ control: formMethods.control });

      useImperativeHandle(ref, () => ({
        submit: () => {
          TextInput.State.blurTextInput(
            TextInput.State.currentlyFocusedInput()
          );
          handleSubmit(onSubmitHandler, onSubmitErrorHandler)();
        },
        getDirtyFields: () => dirtyFields,
        getValues: () => formMethods.getValues(),
        reset: formMethods.reset,
      }));

      return <WrappedComponent formMethods={formMethods} disabled={disabled} />;
    }
  );
};

declare type withFormHOC<T extends FieldValues> = {
  submit: ReturnType<UseFormHandleSubmit<T>>;
  getDirtyFields: () => Partial<T>;
  getValues: () => T;
  reset: UseFormReset<T>;
};

export { withFormHOC };
