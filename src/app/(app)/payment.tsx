import { router } from 'expo-router';
import { useRef } from 'react';

import type { BuyFormSubmitHandler } from '@/components/payment/buy-form';
import { BuyForm } from '@/components/payment/buy-form';
import { Button, SafeAreaView, ScrollView, View } from '@/ui';

export default function Payment() {
  const buyFormRef = useRef<BuyForm>(null);

  const onSubmitHandler: BuyFormSubmitHandler = () => {};

  return (
    <SafeAreaView className="flex-1 bg-light_background">
      <ScrollView className="-mb-12">
        <BuyForm
          ref={buyFormRef}
          onSubmitHandler={onSubmitHandler}
          disabled={false}
        />
        <View className="bg-light_background px-4">
          <Button
            label="Buy"
            className="h-12 "
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
