import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { FlatList } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { twMerge } from 'tailwind-merge';

import { useAddShoppingCartItems } from '@/api/cart/use-add-line-item';
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

type DropdownItem = {
  label: string;
  value: number;
};

type AddToCartSectionProps = {
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  quantity: number;
  buy: () => void;
};

const ImageDisplayer = ({ images }: { images: string[] | undefined }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  if (images === undefined) {
    return;
  }

  return (
    <>
      <View className="h-68 w-68 my-3 w-full rounded-lg">
        <Image
          source={{ uri: images[selectedImage] }}
          className="h-72 w-full"
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
            className="mr-4 h-28 w-28 rounded-md"
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

const AddToCartSection = ({
  quantity,
  setQuantity,
  buy,
}: AddToCartSectionProps) => {
  const numberItems: DropdownItem[] = Array.from(
    { length: quantity },
    (_, index) => ({
      label: (index + 1).toString(),
      value: index + 1,
    })
  );
  const [selectedValue, setSelectedValue] = useState<string>('1');

  return (
    <View className="mb-4 flex-row items-center justify-between">
      <View className="items-center">
        <Text className="mb-3 mr-2 font-bold">Quantity</Text>
        <Dropdown
          style={{
            width: 90,
            borderColor: 'black',
            borderWidth: 2,
            padding: 8,
            borderRadius: 8,
            height: 43,
            marginBottom: 8,
          }}
          data={numberItems}
          labelField="label"
          valueField="value"
          placeholder="1"
          value={selectedValue}
          onChange={(item: DropdownItem) => {
            setSelectedValue(item.value.toString());
            setQuantity(item.value);
          }}
        />
      </View>
      <View className="w-4/5 items-center">
        <Text className=" mr-2 font-bold">Avalability: {quantity} items</Text>
        <Button
          className="mt-3 h-12 w-72"
          label="Add to cart"
          textClassName="font-bold text-base"
          onPress={buy}
        />
      </View>
    </View>
  );
};

export default function DetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { data } = useGetItemDetails(Number(id));
  const [quantity, setQuantity] = useState<number>(1);

  const mutate = useAddShoppingCartItems({});

  const buy = async () => {
    try {
      await mutate.mutateAsync({ itemId: Number(id), quantity });
    } catch (error) {}
    router.back();
  };

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
            buy={buy}
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
