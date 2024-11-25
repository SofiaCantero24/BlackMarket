import images from 'assets';
import { Link } from 'expo-router';
import { memo } from 'react';

import { usePatchShoppingCartItem } from '@/api/cart/use-patch-line-item';
import { useRemoveShoppingCartItem } from '@/api/cart/use-remove-line-item';
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
  removeItem: () => void;
};

const QuantityController = ({
  quantity,
  handlePress,
  removeItem,
}: QuantityControllerProps) => {
  return (
    <View className="flex-row items-center gap-4">
      <TouchableOpacity
        onPress={() => {
          if (quantity > 1) {
            handlePress(quantity - 1);
          } else {
            removeItem();
          }
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

const StateLabel = ({ state }: { state: string }) => {
  return (
    <View
      className={`mb-2 mt-1 w-12 items-center space-x-2 rounded-md rounded-tl-none px-2 py-1 ${
        state === 'used' ? 'bg-restored' : 'bg-new'
      }`}
    >
      <Text className={`text-xs font-semibold text-white`}>
        {state === 'used' ? 'Used' : 'New'}
      </Text>
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
    const { mutate: patchShoppingCartItem } = usePatchShoppingCartItem({
      onSuccess: refetch,
      onError: (error) => {
        showErrorMessage(error);
      },
    });
    const { mutate: removeItem } = useRemoveShoppingCartItem({
      onSuccess: refetch,
    });

    const handlePatch = (newQuantity: number) => {
      patchShoppingCartItem({ itemId: id, quantity: newQuantity });
    };

    const handleRemove = () => {
      removeItem({ itemId: id });
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
          <StateLabel state={state} />
          <View className="mt-4 flex-row items-center justify-between">
            <TouchableOpacity onPress={handleRemove}>
              <Text className="text-lg font-semibold text-link">Remove</Text>
            </TouchableOpacity>
            <QuantityController
              quantity={quantity}
              handlePress={handlePatch}
              removeItem={handleRemove}
            />
          </View>
        </View>
      </View>
    );
  }
);
