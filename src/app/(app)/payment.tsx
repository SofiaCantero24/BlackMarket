import { router } from 'expo-router';
import { useRef } from 'react';

import type { BuyFormSubmitHandler } from '@/components/payment/buy-form';
import { BuyForm } from '@/components/payment/buy-form';
import { Button, SafeAreaView } from '@/ui';

export default function Payment() {
  const buyFormRef = useRef<BuyForm>(null);

  const onSubmitHandler: BuyFormSubmitHandler = () => {};

  return (
    <SafeAreaView className="flex-1">
      <BuyForm ref={buyFormRef} onSubmitHandler={onSubmitHandler} />
      <Button
        label="Buy"
        className="h-12"
        textClassName="font-bold text-base"
        onPress={() => {
          buyFormRef.current?.submit();
        }}
      />
      <Button
        variant="outline"
        label="Cancel"
        className="mb-8"
        onPress={() => {
          router.back();
        }}
      />
    </SafeAreaView>
  );
}
