import { useState } from 'react';
import type { SubmitErrorHandler } from 'react-hook-form';
import { FormProvider } from 'react-hook-form';
import { z } from 'zod';

import { withFormHOC } from '@/core/hoc/hoc-form';
import { FormInputs } from '@/core/hoc/multiple-input';
import { Button, Checkbox, ScrollView, Text, View } from '@/ui';

import { DatePicker, schema as dateSchema } from '../date-picker';
import { HeaderLogo } from '../header-logo';

export const _adressSchema = z.object({
  city: z.string({
    required_error: 'City required',
  }),
  country: z.string({
    required_error: 'Country required',
  }),
  adress1: z.string({
    required_error: 'Adress required',
  }),
  adress2: z.string().optional(),
  postalCode: z.string({
    required_error: 'Postal Code required',
  }),
});

const _cardSchema = z.object({
  cardNumber: z.string({
    required_error: 'Card number required',
  }),
  cvcCode: z.string({
    required_error: 'CVC code required',
  }),
});

const schema = _adressSchema.and(_cardSchema).and(dateSchema);

export type TBuyFormFields = z.infer<typeof schema>;

export type BuyFormSubmitHandler = (fields: TBuyFormFields) => void;
export type BuyFormSubmitErrorHandler = SubmitErrorHandler<TBuyFormFields>;

export const adressFields = [
  {
    name: 'city',
    label: 'City',
    required: true,
    placeholder: 'City',
  },
  {
    name: 'country',
    label: 'Country',
    required: true,
    placeholder: 'Country',
  },
  {
    name: 'adress1',
    label: 'Adress line 1',
    required: true,
    placeholder: 'Adress 1',
  },
  {
    name: 'adress2',
    label: 'Adress line 2',
    required: false,
    placeholder: 'Adress 1',
  },
  {
    name: 'postalCode',
    label: 'Postal Code',
    required: true,
    placeholder: 'Postal code',
  },
];

const cardFields = [
  {
    name: 'cardNumber',
    label: 'Card Number',
    required: true,
    placeholder: 'Card number',
  },
  {
    name: 'cvcCode',
    label: 'CVC code',
    required: true,
    placeholder: 'CVC code',
  },
];

const BuyForm = withFormHOC(
  {
    schema,
    config: {
      shouldFocusError: false,
      mode: 'onSubmit',
    },
  },
  ({ formMethods, disabled }) => {
    const { control } = formMethods;
    const [showAdressForm, setShowAdressForm] = useState(true);

    return (
      <View className="pb-16">
        <HeaderLogo />
        <ScrollView className="bg-light_background px-4">
          <FormInputs
            title="Please add your shipping adress"
            fields={adressFields}
            control={control}
            editable={!disabled}
            titleClassname="my-4 text-lg font-semibold"
            inputClassname="border rounded-lg p-3 bg-white"
            textClassname="text-lg mb-2"
          />
          <FormInputs
            title="Payment information"
            fields={cardFields.slice(0, 1)}
            editable={!disabled}
            control={control}
            titleClassname="my-4 text-lg font-semibold"
            inputClassname="border rounded-lg p-3 bg-white"
            textClassname="text-lg"
          />
          <View className="">
            <Text className="mb-1.5 mt-3">Expiration date *</Text>
            <FormProvider {...formMethods}>
              <DatePicker editable={!disabled} />
            </FormProvider>
          </View>
          <FormInputs
            fields={cardFields.slice(1, 2)}
            editable={!disabled}
            control={control}
            inputClassname="border rounded-lg p-3 bg-white"
            textClassname="text-lg"
          />
          <View className="mb-2 mt-6 w-80 self-center">
            <Checkbox
              onChange={setShowAdressForm}
              checked={showAdressForm}
              label="Use my shipping address as my billing address"
              accessibilityLabel="Label 2"
              className="mb-4"
            />
          </View>
          <Button
            label="Buy"
            className="h-12"
            textClassName="font-bold text-base"
          />
          <Button variant="outline" label="Cancel" className="mb-8" />
        </ScrollView>
      </View>
    );
  }
);

declare type BuyForm = withFormHOC<TBuyFormFields>;

export { BuyForm };
