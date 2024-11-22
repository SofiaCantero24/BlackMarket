import { StyleSheet } from 'nativewind';
import { type ComponentProps } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Dropdown } from 'react-native-element-dropdown';
import { z } from 'zod';

import type { Input } from '@/ui';
import { View } from '@/ui';
import { white } from '@/ui/colors';

type DropdownItem = {
  label: string;
  value: number;
};

const monthOptions = Array.from({ length: 12 }, (_, index) => ({
  label: (index + 1).toString(),
  value: index + 1,
}));

const yearOptions = [
  {
    label: '2024',
    value: 2024,
  },
  {
    label: '2025',
    value: 2025,
  },
  {
    label: '2026',
    value: 2026,
  },
  {
    label: '2027',
    value: 2027,
  },
  {
    label: '2028',
    value: 2028,
  },
  {
    label: '2029',
    value: 2029,
  },
];

export const schema = z.object({
  expirationMonth: z.number().min(1, 'Month required'),
  expirationYear: z.number().min(2024, 'Year required'),
});

type TInput = z.infer<typeof schema>;

export type Props = Pick<ComponentProps<typeof Input>, 'editable'>;

export const DatePicker = ({ editable }: Props) => {
  const { control } = useFormContext<TInput>();
  if (!control) {
    throw new Error('Month and Year must be used within a FormProvider');
  }

  return (
    <>
      <View className="mb-2">
        <Controller
          control={control}
          name="expirationMonth"
          render={({ field: { onChange, value } }) => (
            <Dropdown
              style={dropdownStyles.dropdownContainer}
              placeholderStyle={dropdownStyles.dropdownPlaceHolder}
              data={monthOptions}
              labelField="label"
              valueField="value"
              placeholder={value?.toString() ?? 'Month'}
              value={value?.toString()}
              onChange={(item: DropdownItem) => {
                onChange(item.value);
              }}
              disable={!editable}
            />
          )}
        />
      </View>
      <View>
        <Controller
          control={control}
          name="expirationYear"
          render={({ field: { onChange, value } }) => (
            <Dropdown
              style={dropdownStyles.dropdownContainer}
              placeholderStyle={dropdownStyles.dropdownPlaceHolder}
              data={yearOptions}
              labelField="label"
              valueField="value"
              placeholder={value?.toString() ?? 'Year'}
              value={value?.toString()}
              onChange={(item: DropdownItem) => {
                onChange(item.value);
              }}
              disable={!editable}
            />
          )}
        />
      </View>
    </>
  );
};

const dropdownStyles = StyleSheet.create({
  dropdownContainer: {
    width: '100%',
    borderColor: 'black',
    borderWidth: 1,
    padding: 8,
    borderRadius: 8,
    height: 43,
    marginBottom: 8,
    backgroundColor: white,
  },
  dropdownPlaceHolder: {
    color: 'gray',
  },
});
