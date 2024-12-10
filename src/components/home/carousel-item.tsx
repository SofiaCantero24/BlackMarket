import { Link } from 'expo-router';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { twMerge } from 'tailwind-merge';

import { useAddFavorite } from '@/api/favorites/add-favorite';
import { useRemoveFavorite } from '@/api/favorites/remove-favorite';
import type { Product } from '@/api/products/types';
import { Image, showErrorMessage, Text, View } from '@/ui';
import { Favorite } from '@/ui/icons';

import type { TitleAndFavoriteProps } from '../products-list/product-card';

type IconType = {
  focused: boolean;
};

const Icon = ({ focused, ...props }: IconType) => {
  const fillColor = focused ? 'red' : 'none';
  return (
    <View className="m-2">
      <Favorite
        color={fillColor}
        stroke="black"
        strokeWidth="4%"
        fill={fillColor}
        {...props}
      />
    </View>
  );
};

const TitleAndFavorite = ({
  isFavorite,
  name,
  id,
  refetch,
}: TitleAndFavoriteProps) => {
  const { mutate: addFavorite } = useAddFavorite({
    onSuccess: () => {
      refetch();
    },
    onError: () => {
      showErrorMessage('Something went wrong');
    },
  });
  const { mutate: removeFavorite } = useRemoveFavorite({
    onSuccess: () => {
      refetch();
    },
    onError: () => {
      showErrorMessage('Something went wrong');
    },
  });

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(id);
    } else {
      addFavorite(id);
    }
    refetch();
  };

  return (
    <View className="h-18 w-full flex-row items-center justify-between pl-4 pr-2 pt-2">
      <Text numberOfLines={2} className="w-3/5 font-semibold">
        {name}
      </Text>
      <TouchableOpacity onPress={toggleFavorite}>
        <Icon focused={isFavorite} />
      </TouchableOpacity>
    </View>
  );
};

export const CarouselItem = ({
  item,
  refetch,
}: {
  item: Product;
  refetch: () => void;
}) => {
  return (
    <View className="h-64 w-48 rounded-lg bg-white shadow shadow-gray-600">
      <Link
        href={{
          pathname: '/details/[id]',
          params: { id: item.id },
        }}
        className="self-center"
      >
        <View className="items-center">
          <Image
            source={item.pictures[0]}
            className="m-2 h-32 w-32 rounded-md object-cover"
            contentFit="contain"
          />
        </View>
      </Link>
      <View className="h-px bg-black shadow-lg shadow-gray-400 " />
      <View className="flex-row items-center justify-between px-4 pt-2 opacity-100">
        <Link
          href={{
            pathname: '/details/[id]',
            params: { id: item.id },
          }}
        >
          <Text className="text-lg font-semibold">{item.unit_price}</Text>
        </Link>
        <View
          className={twMerge(
            item.state === 'totaly_new' ? 'bg-new' : 'bg-restored',
            'flex items-center justify-center rounded-md p-0.5 px-2'
          )}
        >
          <Text className="text-white">
            {`${item.state === 'totaly_new' ? 'New' : 'Restored'}`}
          </Text>
        </View>
      </View>
      <TitleAndFavorite
        id={item.id}
        isFavorite={item.is_favorite}
        name={item.title}
        refetch={refetch}
      />
    </View>
  );
};
