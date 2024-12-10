import { useFocusEffect } from 'expo-router';
import { useCallback } from 'react';
import { FlatList } from 'react-native';

import { API_CONSTS } from '@/api/consts';
import { usePurchases } from '@/api/purchase/get-purchases';
import type { Purchase } from '@/api/purchase/types';
import { HeaderLogo } from '@/components/header-logo';
import { PurchaseCard } from '@/components/purchases/purchase-card';
import { SafeAreaView, Text, View } from '@/ui';

export default function Purchases() {
  const {
    data: products,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    refetch,
  } = usePurchases({
    variables: { items: API_CONSTS.INITIAL_ITEMS },
    select: (data) => {
      const allLineItems = data.pages.flatMap((page) =>
        page.data.flatMap((purchase: Purchase) => purchase.line_items)
      );
      return { ...data, allLineItems };
    },
  });

  const handleReachEnd = () => {
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
    <SafeAreaView className="bg-light_background">
      <HeaderLogo />
      <View className=" bg-light_background pb-32 pt-4">
        <Text className="mx-4">My previous purchases</Text>
        <FlatList
          data={products?.allLineItems}
          extraData={products?.allLineItems}
          className="py-4"
          onEndReached={handleReachEnd}
          renderItem={({ item }) => {
            return (
              <View className="mx-4">
                <PurchaseCard
                  id={item.id}
                  price={item.product.unit_price}
                  state={item.product.state}
                  name={item.product.title}
                  image_url={item.product.pictures[0]}
                  quantity={item.quantity}
                />
              </View>
            );
          }}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </SafeAreaView>
  );
}
