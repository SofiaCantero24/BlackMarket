import { useFocusEffect } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { FlatList } from 'react-native';

import type { CartItem } from '@/api/cart/types';
import { API_CONSTS } from '@/api/consts';
import { usePruchases } from '@/api/purchase/get-purchases';
import type { Purchase } from '@/api/purchase/types';
import { HeaderLogo } from '@/components/header-logo';
import { PurchaseCard } from '@/components/purchases/purchase-card';
import { SafeAreaView, Text, View } from '@/ui';

export default function Purchases() {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, refetch } =
    usePruchases({
      variables: { items: API_CONSTS.INITIAL_ITEMS },
    });

  const [lineItems, setLineItems] = useState<CartItem[]>([]);
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

  useEffect(() => {
    const allLineItems =
      data?.pages.flatMap((page) =>
        page.data.flatMap((purchase: Purchase) => purchase.line_items)
      ) || [];
    setLineItems(allLineItems);
  }, [data]);

  return (
    <SafeAreaView className="bg-light_background">
      <HeaderLogo />
      <View className=" bg-light_background pb-32 pt-4">
        <Text className="mx-4">My previous purchases</Text>
        <FlatList
          data={lineItems}
          extraData={lineItems}
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
