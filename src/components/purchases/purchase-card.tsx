import { Link } from 'expo-router';
import { memo } from 'react';

import { Image, Text, View } from '@/ui';

export interface ShoppingProductCardProps {
  id: number;
  name: string;
  price: string;
  state: string;
  image_url: string;
  quantity: number;
}

const StateLabel = ({ state }: { state: string }) => {
  return (
    <View
      className={`mb-2 mt-1 w-12 items-center space-x-2 rounded-md px-2 py-1 ${
        state === 'used' ? 'bg-restored' : 'bg-new'
      }`}
    >
      <Text className={`text-xs font-semibold text-white`}>
        {state === 'used' ? 'Used' : 'New'}
      </Text>
    </View>
  );
};

export const PurchaseCard = memo(
  ({
    name,
    price,
    state,
    image_url,
    id,
    quantity,
  }: ShoppingProductCardProps) => {
    const detailsRoute = '/details/[id]';
    return (
      <View className="mb-6 w-full flex-row items-center justify-between space-x-4  rounded-lg bg-white p-3 shadow shadow-gray-600">
        <Link
          href={{
            pathname: detailsRoute,
            params: { id: id },
          }}
        >
          <Image
            source={{ uri: image_url }}
            className="flex h-28 w-24"
            contentFit="contain"
          />
        </Link>
        <View className="w-full flex-1 px-4 py-3">
          <View className="flex-row items-center justify-between">
            <Link
              href={{
                pathname: detailsRoute,
                params: { id: id },
              }}
              className='className="h-full w-2/4'
            >
              <Text className="text-md font-semibold">{name}</Text>
            </Link>
            <Text className="font-semibold">Price: {price}</Text>
          </View>
          <StateLabel state={state} />
          <View className="mt-4 flex-row items-center justify-between">
            <Text className="text-md font-semibold">{quantity} item</Text>
            <Text> Bought on</Text>
          </View>
        </View>
      </View>
    );
  }
);
