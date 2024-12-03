import images from 'assets';

import { HeaderLogo } from '@/components/header-logo';
import { HorizontalCarousel } from '@/components/home/carousel';
import PaymentMethods from '@/components/home/payment-methods';
import { Image, SafeAreaView, ScrollView, Text, View } from '@/ui';

export default function Feed() {
  return (
    <SafeAreaView className="bg-light_background">
      <HeaderLogo />
      <ScrollView>
        <HorizontalCarousel />
        <View className="h-52">
          <Image
            className="w-full flex-1"
            source={images.productsBanner()}
            contentFit="contain"
          />
        </View>
        <View className="bg-white">
          <Text className="my-8 self-center text-lg font-bold">
            Payment methods
          </Text>
          <PaymentMethods />
        </View>
        <View className="h-48">
          <Image
            className="w-full flex-1"
            source={images.fedexBanner()}
            contentFit="contain"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
