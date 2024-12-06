import images from 'assets';

import { Image, Text, TouchableOpacity, View } from '@/ui';

const PaymentMethods = () => {
  return (
    <View className="my-4 h-20 w-4/5 flex-row items-center justify-evenly self-center">
      <TouchableOpacity className="mx-3 items-center justify-items-center">
        <Image
          source={images.creditCard()}
          className="mb-6 h-9 w-9"
          contentFit="contain"
        />
        <Text>Credit</Text>
      </TouchableOpacity>
      <View className="mx-5 h-full w-px bg-black" />
      <TouchableOpacity className="mx-3 items-center justify-items-center">
        <Image
          source={images.paypal()}
          className="mb-6 h-9 w-9"
          contentFit="contain"
        />
        <Text>Paypal</Text>
      </TouchableOpacity>
      <View className="mx-5 h-full w-px bg-black" />
      <TouchableOpacity className="mx-3 items-center justify-items-center">
        <Image
          source={images.crypto()}
          className="mb-6 h-9 w-9"
          contentFit="contain"
        />
        <Text>Crypto</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PaymentMethods;
