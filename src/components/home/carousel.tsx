import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback } from 'react';
import { FlatList } from 'react-native';

import { useProducts } from '@/api/products/use-products';
import { Text, TouchableOpacity } from '@/ui';

import { CarouselItem } from './carousel-item';
export const HorizontalCarousel = () => {
  const router = useRouter();
  const {
    data: products,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    refetch,
  } = useProducts({ variables: { items: 7, text: '' } });
  const productsToDisplay = products?.pages.flatMap((page) => page.data) || [];
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

  return (
    <>
      <FlatList
        className="h-[280]"
        data={productsToDisplay}
        contentContainerClassName="gap-4 px-4 items-center"
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <CarouselItem item={item} />}
        onEndReached={handleLoadMore}
      />
      <TouchableOpacity
        className="items-center"
        onPress={() => {
          router.push('/(app)/product-list');
        }}
      >
        <Text className="font-semibold text-link">See all</Text>
      </TouchableOpacity>
    </>
  );
};
