import images from 'assets';

import { HeaderLogo } from '@/components/header-logo';
import { Banner } from '@/components/home/bannner';
import { HorizontalCarousel } from '@/components/home/carousel';
import PaymentMethods from '@/components/home/payment-methods';
import { dashboard } from '@/translations/en.json';
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
            {dashboard.promotions.checkOutPromotion}
          </Text>
          <Text className="color-white">
            {dashboard.promotions.shopTodayDiscount}
          </Text>
        </Banner>
        <View className="bg-white">
          <Text className="mb-8 mt-4 self-center text-lg font-bold">
            {dashboard.labels.paymentMethods}
          </Text>
          <PaymentMethods />
        </View>
        <Banner
          alignment="right"
          background="dark"
          image={images.fedexBanner()}
        >
          <Text className="mb-2 font-semibold color-white">
            {dashboard.promotions.shipmentUpgrade}
          </Text>
          <Text className="color-white">
            {dashboard.promotions.poweredByFedEx}{' '}
            <Text className="color-green-400">
              {dashboard.promotions.fedEx}
            </Text>
          </Text>
        </Banner>
      </ScrollView>
    </SafeAreaView>
  );
}
