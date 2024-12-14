import { useFocusEffect } from 'expo-router';
import { useCallback } from 'react';
import { FlatList } from 'react-native';
import { twMerge } from 'tailwind-merge';

import { API_CONSTS } from '@/api/consts';
import { useFavorites } from '@/api/favorites/use-favorites';
import { FavoriteCard } from '@/components/favourites/favorite-card';
import { HeaderLogo } from '@/components/header-logo';
import { SafeAreaView, Text, View } from '@/ui';

export default function Favorite() {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, refetch } =
    useFavorites({ variables: { items: API_CONSTS.INITIAL_ITEMS } });

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  const productsToDisplay = data?.pages.flatMap((page) => page.data) || [];

  return (
    <>
      <SafeAreaView className="flex-1">
        <View className="bg-light_background pb-52">
          <HeaderLogo />
          <Text className="my-4 px-4 text-lg">My favourites</Text>
          <FlatList
            className="pb-6"
            onEndReached={handleLoadMore}
            data={productsToDisplay}
            renderItem={({ item, index }) => {
              const isFirstItem = index === 0;
              const isLastItem = index === productsToDisplay.length - 1;

              return (
                <View
                  className={twMerge(
                    'mx-4 border',
                    isFirstItem && 'rounded-t-lg',
                    isLastItem && 'rounded-b-lg'
                  )}
                >
                  <FavoriteCard
                    id={item.product.id}
                    price={item.product.unit_price}
                    state={item.product.state}
                    name={item.product.title}
                    image_url={item.product.pictures[0]}
                  />
                </View>
              );
            }}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      </SafeAreaView>
    </>
  );
}
