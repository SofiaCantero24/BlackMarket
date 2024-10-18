import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { FlatList } from 'react-native';

import { useGetItemDetails } from '@/api/products/use-details';
import { HeaderLogo } from '@/components/header-logo';
import {
  Button,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from '@/ui';

const ImageDisplayer = ({ images }: { images: string[] | undefined }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  if (images === undefined) {
    return;
  }

  return (
    <>
      <View className="h-68 my-3 w-full rounded-lg bg-white">
        <Image
          source={{ uri: images[selectedImage] }}
          className="my-3 h-72 w-full rounded-lg"
          contentFit="contain"
        />
      </View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={images}
        keyExtractor={(index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            className="mr-4 h-28 w-28 rounded-md bg-white"
            onPress={() => setSelectedImage(index)}
          >
            <Image
              source={{ uri: item }}
              contentFit="contain"
              className="h-28 w-28 rounded-md"
            />
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingBottom: 16 }}
      />
    </>
  );
};

export default function DetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { data } = useGetItemDetails(Number(id));

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView>
        <HeaderLogo />
        <View className="px-4 py-3">
          <View className="flex-row justify-between">
            <View
              className={`${
                data?.state === 'totaly_new'
                  ? 'bg-tags-new'
                  : 'bg-tags-restored'
              } w-1/4 items-center justify-center rounded-md`}
            >
              <Text className="text-white">
                {data?.state === 'totaly_new' ? 'new' : 'restored'}
              </Text>
            </View>
            <TouchableOpacity className="mr-4" onPress={router.back}>
              <Text className="text-2xl font-bold text-red-700">X</Text>
            </TouchableOpacity>
          </View>
          <Text className="font-semi-bold">{data?.title}</Text>
          <Text className="font-light">{data?.category.name}</Text>
          <Text className="font-semi-bold">{data?.unit_price}</Text>
          <ImageDisplayer images={data?.pictures} />
          <View className="mb-4 flex-row items-center justify-between">
            <View className="items-center">
              <Text className="mb-3 mr-2 font-bold">Quantity</Text>
            </View>
            <View className="w-2/3 items-center">
              <Text className=" mr-2 font-bold">
                Avalability: {data?.stock} items
              </Text>
              {data?.id && (
                <Button
                  className="mt-3 h-12"
                  label="Buy"
                  textClassName="font-bold text-base"
                  onPress={() => {}}
                />
              )}
            </View>
          </View>
          <View className="mb-4">
            <Text className="mb-3 mr-2 font-bold">Product description</Text>
            <Text>{data?.description}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
