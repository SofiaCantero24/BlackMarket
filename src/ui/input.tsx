import images from 'assets';
import { forwardRef, useCallback, useMemo, useState } from 'react';
import type {
  Control,
  FieldValues,
  Path,
  RegisterOptions,
} from 'react-hook-form';
import { useController } from 'react-hook-form';
import type { TextInput, TextInputProps } from 'react-native';
import { I18nManager, StyleSheet, View } from 'react-native';
import { TextInput as NTextInput } from 'react-native';
import { tv } from 'tailwind-variants';

import colors from './colors';
import { Image } from './image';
import { Text } from './text';

const inputTv = tv({
  slots: {
    container: 'mb-2',
    label: 'text-grey-100 mb-1 text-lg dark:text-neutral-100',
    input:
      'mt-0 rounded-xl border-[0.5px] border-neutral-300 bg-neutral-100 px-4 py-3 font-inter  text-base font-medium leading-5 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white',
  },

  variants: {
    focused: {
      true: {
        input: 'border-neutral-400 dark:border-neutral-300',
      },
    },
    error: {
      true: {
        input: 'border-danger-600',
        label: 'text-danger-600 dark:text-danger-600',
      },
    },
    disabled: {
      true: {
        input: 'bg-neutral-200',
      },
    },
  },
  defaultVariants: {
    focused: false,
    error: false,
    disabled: false,
  },
});

export interface NInputProps extends TextInputProps {
  label?: string;
  disabled?: boolean;
  error?: string;
  labelClassname?: string;
  showError?: boolean;
}

type TRule = Omit<
  RegisterOptions,
  'valueAsNumber' | 'valueAsDate' | 'setValueAs'
>;

export type RuleType<T> = { [name in keyof T]: TRule };
export type InputControllerType<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  rules?: TRule;
};

interface ControlledInputProps<T extends FieldValues>
  extends NInputProps,
    InputControllerType<T> {}

const ShowPasswordIcon = () => {
  return (
    <Image
      contentFit="contain"
      className="ml-2 h-6 w-6"
      source={images.visibilityOff()}
    />
  );
};

export const Input = forwardRef<TextInput, NInputProps>((props, ref) => {
  const {
    showError,
    labelClassname,
    label,
    error,
    testID,
    className,
    ...inputProps
  } = props;
  const [isFocussed, setIsFocussed] = useState(false);
  const onBlur = useCallback(() => setIsFocussed(false), []);
  const onFocus = useCallback(() => setIsFocussed(true), []);

  const styles = useMemo(
    () =>
      inputTv({
        error: Boolean(error),
        focused: isFocussed,
        disabled: Boolean(props.disabled),
      }),
    [error, isFocussed, props.disabled]
  );

  return (
    <View className={styles.container()}>
      {label && (
        <Text
          testID={testID ? `${testID}-label` : undefined}
          className={(styles.label(), labelClassname)}
        >
          {label}
        </Text>
      )}
      <View
        className={`w-full flex-row items-center justify-between ${
          className ? className : styles.input()
        }`}
      >
        <NTextInput
          testID={testID}
          ref={ref}
          placeholderTextColor={colors.neutral[400]}
          onBlur={onBlur}
          onFocus={onFocus}
          className="flex-auto"
          {...inputProps}
          style={StyleSheet.flatten([
            { writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr' },
            { textAlign: I18nManager.isRTL ? 'right' : 'left' },
            inputProps.style,
          ])}
        />
        {inputProps.secureTextEntry && <ShowPasswordIcon />}
      </View>
      {error && showError && (
        <Text
          testID={testID ? `${testID}-error` : undefined}
          className="text-sm text-danger-400 dark:text-danger-600"
        >
          {error}
        </Text>
      )}
    </View>
  );
});

// only used with react-hook-form
export function ControlledInput<T extends FieldValues>(
  props: ControlledInputProps<T>
) {
  const { name, control, rules, ...inputProps } = props;

  const { field, fieldState } = useController({ control, name, rules });
  return (
    <Input
      ref={field.ref}
      autoCapitalize="none"
      onChangeText={field.onChange}
      value={(field.value as string) || ''}
      {...inputProps}
      error={fieldState.error?.message}
    />
  );
}
