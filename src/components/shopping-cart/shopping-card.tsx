import images from 'assets';
import { Link } from 'expo-router';
import { memo } from 'react';

import { usePatchShoppingCartItem } from '@/api/cart/use-patch-line-item';
import { Image, showErrorMessage, Text, TouchableOpacity, View } from '@/ui';

export interface ShoppingProductCardProps {
  id: number;
  name: string;
  price: string;
  state: string;
  image_url: string;
  quantity: number;
  refetch: () => void;
}

type QuantityControllerProps = {
  quantity: number;
  handlePress: (newQuantity: number) => void;
};

const QuantityController = ({
  quantity,
  handlePress,
}: QuantityControllerProps) => {
  return (
    <View className="flex-row items-center gap-4">
      <TouchableOpacity
        onPress={() => {
          handlePress(0);
        }}
      >
        <Image
          source={images.trashIcon()}
          contentFit="contain"
          className="h-4 w-4"
        />
      </TouchableOpacity>
      <Text>{quantity}</Text>
      <TouchableOpacity
        onPress={() => {
          handlePress(quantity + 1);
        }}
      >
        <Image
          source={images.plusIcon()}
          contentFit="contain"
          className="h-4 w-4"
        />
      </TouchableOpacity>
    </View>
  );
};

export const ShoppingCard = memo(
  ({
    name,
    price,
    state,
    image_url,
    id,
    quantity,
    refetch,
  }: ShoppingProductCardProps) => {
    const { mutate: patchShoppingCartItem } = usePatchShoppingCartItem({});

    const handlePatch = (newQuantity: number) => {
      try {
        patchShoppingCartItem({ itemId: id, quantity: newQuantity });
        refetch();
      } catch {
        showErrorMessage('Something went wrong');
      }
    };

    const detailsRoute = '/details/[id]';
    return (
      <View className="w-full flex-row items-center justify-between space-x-4 rounded-lg bg-white p-3">
        <Link
          href={{
            pathname: detailsRoute,
            params: { id: id },
          }}
        >
          <Image
            source={{ uri: image_url }}
            className="flex h-32 w-32"
            contentFit="contain"
          />
        </Link>
        <View className="w-full flex-1 px-4">
          <View className="flex-row items-center justify-between">
            <Link
              href={{
                pathname: detailsRoute,
                params: { id: id },
              }}
              className='className="h-full w-3/4'
            >
              <Text className="text-xl font-bold">{name}</Text>
            </Link>
            <Text>{price}</Text>
          </View>
          <View
            className={`mb-2 mt-1 w-12 items-center space-x-2 rounded-md rounded-tl-none px-2 py-1 ${
              state === 'used' ? 'bg-restored' : 'bg-new'
            }`}
          >
            <Text className={`text-xs font-semibold text-white`}>
              {state === 'used' ? 'Used' : 'New'}
            </Text>
          </View>
          <View className="mt-4 flex-row items-center justify-between">
            <Text className="text-lg font-semibold text-link">Remove</Text>
            <QuantityController quantity={quantity} handlePress={handlePatch} />
          </View>
        </View>
      </View>
    );
  }
);
