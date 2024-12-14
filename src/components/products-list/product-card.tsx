import { Link } from 'expo-router';
import { memo } from 'react';

import { useAddFavorite } from '@/api/favorites/add-favorite';
import { useRemoveFavorite } from '@/api/favorites/remove-favorite';
import { Button, Image, Text, TouchableOpacity, View } from '@/ui';
import { Favorite } from '@/ui/icons';

export interface ProductCardProps {
  id: number;
  name: string;
  price: string;
  state: string;
  image_url: string;
  isFavorite: boolean;
}

export type TitleAndFavoriteProps = {
  id: number;
  name: string;
  isFavorite: boolean;
};

const TitleAndFavorite = ({ id, name, isFavorite }: TitleAndFavoriteProps) => {
  const { mutate: addFavorite } = useAddFavorite({});
  const { mutate: removeFavorite } = useRemoveFavorite({});

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(id);
    } else {
      addFavorite(id);
    }
  };

  return (
    <View className="flex-row items-center justify-between">
      <Link
        href={{
          pathname: '/details/[id]',
          params: { id: id },
        }}
        className='className="h-full w-3/4'
      >
        <Text className="text-xl font-bold">{name}</Text>
      </Link>
      <TouchableOpacity
        className="h-12 w-12 rounded-full border border-black p-2"
        activeOpacity={0.7}
        onPress={toggleFavorite}
      >
        <Favorite
          color={`${isFavorite ? '#FF0000' : '#ffffff'}`}
          stroke="#000000"
          strokeWidth={1}
          viewBox="-2.5 -0.5 22 15"
        />
      </TouchableOpacity>
    </View>
  );
};

export const ProductCard = memo(
  ({ name, price, state, image_url, id, isFavorite }: ProductCardProps) => {
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
          <TitleAndFavorite id={id} isFavorite={isFavorite} name={name} />
          <View
            className={`mb-2 mt-1 w-12 items-center space-x-2 rounded-md rounded-tl-none px-2 py-1 ${
              state === 'used' ? 'bg-restored' : 'bg-new'
            }`}
          >
            <Text className={`text-xs font-semibold text-white`}>
              {state === 'used' ? 'Used' : 'New'}
            </Text>
          </View>
          <View className="flex-row items-center justify-between">
            <Text className="text-lg font-bold">{price}</Text>
            <Link
              href={{
                pathname: detailsRoute,
                params: { id: id },
              }}
              asChild
            >
              <Button label="Add to cart" />
            </Link>
          </View>
        </View>
      </View>
    );
  }
);
