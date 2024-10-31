import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

import { useGetItemDetails } from '@/api/products/use-details';
import { AddToCartSection } from '@/components/details/add-to-cart';
import { ImageDisplayer } from '@/components/details/image-displayer';
import { HeaderLogo } from '@/components/header-logo';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from '@/ui';

export default function DetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { data } = useGetItemDetails(Number(id));
  const [quantity, setQuantity] = useState<number>(1);

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView>
        <HeaderLogo />
        <View className="px-4 py-3">
          <View className="flex-row justify-between">
            <View
              className={twMerge(
                data?.state === 'totaly_new' ? 'bg-new' : 'bg-restored',
                'h-6 w-1/5 items-center justify-center rounded-md'
              )}
            >
              <Text className="text-md text-white">
                {data?.state === 'totaly_new' ? 'New' : 'Restored'}
              </Text>
            </View>
            <TouchableOpacity className="mr-4" onPress={router.back}>
              <Text className="text-2xl font-bold text-red-700">X</Text>
            </TouchableOpacity>
          </View>
          <Text className="text-2xl font-semibold">{data?.title}</Text>
          <Text className="text-2xl font-light">{data?.category.name}</Text>
          <Text className="font-semi-bold font-">{data?.unit_price}</Text>
          <ImageDisplayer images={data?.pictures} />
          <AddToCartSection
            quantity={quantity}
            setQuantity={setQuantity}
            buy={() => {}}
          />
          <View className="mb-4">
            <Text className="mb-3 mr-2 font-bold">Product description</Text>
            <Text>{data?.description}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
