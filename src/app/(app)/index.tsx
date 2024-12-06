import images from 'assets';

import { HeaderLogo } from '@/components/header-logo';
import { Banner } from '@/components/home/bannner';
import { HorizontalCarousel } from '@/components/home/carousel';
import PaymentMethods from '@/components/home/payment-methods';
import { SafeAreaView, ScrollView, Text, View } from '@/ui';

export default function Feed() {
  return (
    <SafeAreaView className="bg-light_background">
      <HeaderLogo />
      <ScrollView className="mb-6">
        <HorizontalCarousel />
        <Banner
          alignment="left"
          background="dark"
          image={images.furnitureBanner()}
        >
          <Text className="mb-2 font-semibold color-white">
            Check out our new and restored furniture
          </Text>
          <Text className="color-white">
            Shop today and get a 10% discount!
          </Text>
        </Banner>
        <View className="bg-white">
          <Text className="mb-8 mt-4 self-center text-lg font-bold">
            Payment methods
          </Text>
          <PaymentMethods />
        </View>
        <Banner
          alignment="right"
          background="dark"
          image={images.fedexBanner()}
        >
          <Text className="mb-2 font-semibold color-white">
            We upgraded our shipments many levels up
          </Text>
          <Text className="color-white">
            Powered by <Text className="color-green-400">FedEx</Text>
          </Text>
        </Banner>
      </ScrollView>
    </SafeAreaView>
  );
}
