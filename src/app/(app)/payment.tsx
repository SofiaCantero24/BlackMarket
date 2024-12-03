import { router } from 'expo-router';
import { useRef } from 'react';
import { showMessage } from 'react-native-flash-message';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';

import { usePurchaseOrder } from '@/api/purchase/use-purchase';
import type { BuyFormSubmitHandler } from '@/components/payment/buy-form';
import { BuyForm } from '@/components/payment/buy-form';
import { Button, SafeAreaView, ScrollView, showErrorMessage, View } from '@/ui';

type FormButtonsProps = {
  handleSubmit: () => void;
};

const FormButtons = ({ handleSubmit }: FormButtonsProps) => {
  return (
    <View className="bg-light_background px-4">
      <Button
        label="Buy"
        className="h-12 "
        textClassName="font-bold text-base"
        onPress={handleSubmit}
      />
      <Button
        variant="outline"
        label="Cancel"
        className="mb-8"
        onPress={() => {
          router.back();
        }}
      />
    </View>
  );
};

export default function Payment() {
  const buyFormRef = useRef<BuyForm>(null);
  const { mutate } = usePurchaseOrder({});

  const onSubmitHandler: BuyFormSubmitHandler = (data) => {
    mutate(
      {
        order: {
          credit_card: {
            card_number: data.cardNumber,
            exp_month: data.expirationMonth,
            exp_year: data.expirationYear,
            cvc: data.cvcCode,
          },
          shipping_address: {
            city: data.city,
            country: data.country,
            line_1: data.address1,
            line_2: !data.address2 ? '-' : data.address2,
            postal_code: data.postalCode,
            state: data.country,
          },
        },
      },
      {
        onSuccess: () => {
          showMessage({ message: 'success', type: 'success' });
          router.navigate('/(app)');
        },
        onError: (error) => {
          showErrorMessage('Something went wrong: ' + error);
        },
      }
    );
  };
  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior="padding"
      keyboardVerticalOffset={0}
    >
      <SafeAreaView className="flex-1 bg-light_background">
        <ScrollView className="-mb-12">
          <BuyForm ref={buyFormRef} onSubmitHandler={onSubmitHandler} />
          <FormButtons
            handleSubmit={() => {
              buyFormRef.current?.submit;
            }}
          />
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
