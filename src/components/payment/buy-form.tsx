import { useState } from 'react';
import type { SubmitErrorHandler } from 'react-hook-form';
import { FormProvider } from 'react-hook-form';
import { z } from 'zod';

import { withFormHOC } from '@/core/hoc/hoc-form';
import { FormInputs } from '@/core/hoc/multiple-input';
import { purchaseForm } from '@/translations/en.json';
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
    required_error: purchaseForm.error.cityRequired,
  }),
  country: z.string({
    required_error: purchaseForm.error.countryRequired,
  }),
  address1: z.string({
    required_error: purchaseForm.error.addressReqired,
  }),
  address2: z.string().optional(),
  postalCode: z.string({
    required_error: purchaseForm.error.postalCodeRequired,
  }),
});

const _cardSchema = z.object({
  cardNumber: z.string({
    required_error: purchaseForm.error.cardNumberRequired,
  }),
  cvcCode: z.string({
    required_error: purchaseForm.error.cvcRequired,
  }),
});

export const additionalAddressSchema = z.object({
  addtionalCity: z.string({
    required_error: purchaseForm.error.addressReqired,
  }),
  additionalCountry: z.string({
    required_error: purchaseForm.error.countryRequired,
  }),
  additionalAddress1: z.string({
    required_error: purchaseForm.error.addressReqired,
  }),
  additionalAddress2: z.string().optional(),
  addtionalPostalCode: z.string({
    required_error: purchaseForm.error.postalCodeRequired,
  }),
});

const schema = _addressSchema.and(_cardSchema).and(dateSchema);

export type TBuyFormFields = z.infer<typeof schema>;

export type BuyFormSubmitHandler = (fields: TBuyFormFields) => void;
export type BuyFormSubmitErrorHandler = SubmitErrorHandler<TBuyFormFields>;

export const addressFields = [
  {
    name: 'city',
    label: purchaseForm.labels.city,
    required: true,
    placeholder: purchaseForm.placeholders.city,
  },
  {
    name: 'country',
    label: purchaseForm.labels.country,
    required: true,
    placeholder: purchaseForm.placeholders.country,
  },
  {
    name: 'address1',
    label: purchaseForm.labels.addressLine1,
    required: true,
    placeholder: purchaseForm.placeholders.addressLine1,
  },
  {
    name: 'address2',
    label: purchaseForm.labels.addressLine2,
    required: false,
    placeholder: purchaseForm.placeholders.addressLine2,
  },
  {
    name: 'postalCode',
    label: purchaseForm.labels.postalCode,
    required: true,
    placeholder: purchaseForm.placeholders.postalCode,
  },
];

export const additionalAddressFields = [
  {
    name: 'additionalCity',
    label: purchaseForm.labels.city,
    required: true,
    placeholder: purchaseForm.placeholders.city,
  },
  {
    name: 'additionalCountry',
    label: purchaseForm.labels.country,
    required: true,
    placeholder: purchaseForm.placeholders.country,
  },
  {
    name: 'additionalAddress1',
    label: purchaseForm.labels.addressLine1,
    required: true,
    placeholder: purchaseForm.placeholders.addressLine1,
  },
  {
    name: 'additionalAddress2',
    label: purchaseForm.labels.addressLine2,
    required: false,
    placeholder: purchaseForm.placeholders.addressLine2,
  },
  {
    name: 'additionalPostalCode',
    label: purchaseForm.labels.postalCode,
    required: true,
    placeholder: purchaseForm.placeholders.postalCode,
  },
];

const cardFields = [
  {
    name: 'cardNumber',
    label: purchaseForm.labels.cardNumber,
    required: true,
    placeholder: purchaseForm.placeholders.cardNumber,
    isCardNumber: true,
  },
  {
    name: 'cvcCode',
    label: purchaseForm.placeholders.cvcCode,
    required: true,
    placeholder: purchaseForm.placeholders.cvcCode,
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
            title={purchaseForm.labels.addShippingAddress}
            control={control}
            fields={addressFields}
            editable={!disabled}
          />
          <SectionForm
            title={purchaseForm.labels.paymentInformation}
            control={control}
            fields={cardFields.slice(0, 1)}
            editable={!disabled}
          />
          <View>
            <Text className="mb-1.5 mt-3 text-lg">
              {purchaseForm.labels.expirationDate} {}
            </Text>
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
              title={purchaseForm.labels.addBillingAddress}
              fields={additionalAddressFields}
              control={control}
              editable={!disabled}
            />
          )}
          <View className="mb-2 mt-6 w-80 self-center">
            <Checkbox
              onChange={setShowAddressForm}
              checked={showAddressForm}
              label={purchaseForm.labels.checkBox}
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
