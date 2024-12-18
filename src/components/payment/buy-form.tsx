import { useState } from 'react';
import type { SubmitErrorHandler } from 'react-hook-form';
import { FormProvider } from 'react-hook-form';
import { z } from 'zod';

import { withFormHOC } from '@/core/hoc/hoc-form';
import { FormInputs } from '@/core/hoc/multiple-input';
import { Checkbox, ScrollView, Text, View } from '@/ui';

import { DatePicker, schema as dateSchema } from '../date-picker';
import { HeaderLogo } from '../header-logo';

type SectionFormProps = {
  title?: string;
  fields: any[];
  control: any;
  editable: boolean;
  titleClassname?: string;
  inputClassname?: string;
  textClassname?: string;
  isCreditCard?: boolean;
};

export const _addressSchema = z.object({
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

const _cardSchema = z.object({
  cardNumber: z.string({
    required_error: 'Card number required',
  }),
  cvcCode: z.string({
    required_error: 'CVC code required',
  }),
});

export const additionalAddressSchema = z.object({
  addtionalCity: z.string({
    required_error: 'City required',
  }),
  additionalCountry: z.string({
    required_error: 'Country required',
  }),
  additionalAddress1: z.string({
    required_error: 'Address required',
  }),
  additionalAddress2: z.string().optional(),
  addtionalPostalCode: z.string({
    required_error: 'Postal Code required',
  }),
});

const schema = _addressSchema.and(_cardSchema).and(dateSchema);

export type TBuyFormFields = z.infer<typeof schema>;

export type BuyFormSubmitHandler = (fields: TBuyFormFields) => void;
export type BuyFormSubmitErrorHandler = SubmitErrorHandler<TBuyFormFields>;

export const addressFields = [
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
    name: 'address1',
    label: 'Address line 1',
    required: true,
    placeholder: 'Address 1',
  },
  {
    name: 'address2',
    label: 'Address line 2',
    required: false,
    placeholder: 'Address 1',
  },
  {
    name: 'postalCode',
    label: 'Postal Code',
    required: true,
    placeholder: 'Postal code',
  },
];

export const additionalAddressFields = [
  {
    name: 'additionalCity',
    label: 'City',
    required: true,
    placeholder: 'City',
  },
  {
    name: 'additionalCountry',
    label: 'Country',
    required: true,
    placeholder: 'Country',
  },
  {
    name: 'additionalAddress1',
    label: 'Address line 1',
    required: true,
    placeholder: 'Address 1',
  },
  {
    name: 'additionalAddress2',
    label: 'Address line 2',
    required: false,
    placeholder: 'Address 1',
  },
  {
    name: 'additionalPostalCode',
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
    isCardNumber: true,
  },
  {
    name: 'cvcCode',
    label: 'CVC code',
    required: true,
    placeholder: 'CVC code',
    isCVC: true,
  },
];

const SectionForm = ({
  title,
  fields,
  control,
  editable,
}: SectionFormProps) => {
  return (
    <FormInputs
      title={title}
      fields={fields}
      control={control}
      editable={editable}
      titleClassname="my-4 text-lg font-semibold"
      inputClassname="border rounded-lg p-3 bg-white"
      textClassname="text-lg mb-2"
    />
  );
};

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
    const [showAddressForm, setShowAddressForm] = useState(true);

    return (
      <View>
        <HeaderLogo />
        <ScrollView className="bg-light_background px-4">
          <SectionForm
            title="Please add your shipping address"
            control={control}
            fields={addressFields}
            editable={!disabled}
          />
          <SectionForm
            title="Payment information"
            control={control}
            fields={cardFields.slice(0, 1)}
            editable={!disabled}
          />
          <View className="">
            <Text className="mb-1.5 mt-3 text-lg">Expiration date *</Text>
            <FormProvider {...formMethods}>
              <DatePicker editable={!disabled} />
            </FormProvider>
          </View>
          <SectionForm
            control={control}
            fields={cardFields.slice(1, 2)}
            editable={!disabled}
          />
          {!showAddressForm && (
            <SectionForm
              title="Please add your billing address"
              fields={additionalAddressFields}
              control={control}
              editable={!disabled}
            />
          )}
          <View className="mb-2 mt-6 w-80 self-center">
            <Checkbox
              onChange={setShowAddressForm}
              checked={showAddressForm}
              label="Use my shipping address as my billing address"
              accessibilityLabel="Label 2"
              className="mb-4"
            />
          </View>
        </ScrollView>
      </View>
    );
  }
);

declare type BuyForm = withFormHOC<TBuyFormFields>;

export { BuyForm };
