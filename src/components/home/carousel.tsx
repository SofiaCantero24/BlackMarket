import { useCallback, useEffect, useState } from 'react';
import { FlatList } from 'react-native';

import type { Product } from '@/api/products/types';
import { useProducts } from '@/api/products/use-products';
import { Text, View } from '@/ui';

import { CarouselItem } from './carousel-item';

export const HorizontalCarousel = () => {
  const [page, setPage] = useState(1);
  const { data } = useProducts({ variables: { page: page, items: 7 } });
  const [products, setProducts] = useState<Product[]>([]);
  const [fetchedProducts, setFetchedProducts] = useState<Product[]>([]);

  useEffect(() => {
    setProducts(fetchedProducts);
  }, [fetchedProducts, setProducts]);

  useEffect(() => {
    if (data && data.data) {
      setFetchedProducts((prevProducts) => [...prevProducts, ...data.data]);
    }
  }, [data, setFetchedProducts]);

  const handleEndReached = useCallback(() => {
    const totalItems = data?.pagination?.count ?? 0;
    if (page * 7 - 1 < totalItems) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [page, setPage, data?.pagination.count]);

  const handleScroll = useCallback(
    ({ nativeEvent }: any) => {
      const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
      const isCloseToBottom =
        layoutMeasurement.width + contentOffset.x >= contentSize.width - 20;
      if (isCloseToBottom) {
        handleEndReached();
      }
    },
    [handleEndReached]
  );

  return (
    <>
      <FlatList
        className="h-[280]"
        data={products}
        contentContainerStyle={{
          alignItems: 'center',
          gap: 16,
          paddingHorizontal: 16,
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <CarouselItem item={item} />}
        onEndReached={handleEndReached}
        onScroll={handleScroll}
      />
      <View className="items-center">
        <Text className="font-semibold text-link">See all</Text>
      </View>
    </>
  );
};
