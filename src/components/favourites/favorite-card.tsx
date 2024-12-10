import { Link } from 'expo-router';
import { memo } from 'react';

import { useRemoveFavorite } from '@/api/favorites/remove-favorite';
import { Button, Image, Text, View } from '@/ui';

export interface ShoppingProductCardProps {
  id: number;
  name: string;
  price: string;
  state: string;
  image_url: string;
  refetch: () => void;
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

export const FavoriteCard = memo(
  ({
    name,
    price,
    state,
    image_url,
    id,
    refetch,
  }: ShoppingProductCardProps) => {
    const { mutate: removeFavorite } = useRemoveFavorite({});
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
          <View className="mt-2 flex-row-reverse items-center justify-between">
            <Button
              label="Remove"
              textClassName="text-black"
              className="h-12 border bg-transparent px-5"
              onPress={() => {
                removeFavorite(id);
                refetch();
              }}
            />
          </View>
        </View>
      </View>
    );
  }
);
