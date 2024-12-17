import { router, useFocusEffect } from 'expo-router';
import { useCallback } from 'react';
import { FlatList } from 'react-native';
import { twMerge } from 'tailwind-merge';

import { useShoppingCart } from '@/api/cart/use-line-items';
import { API_CONSTS } from '@/api/consts';
import { HeaderLogo } from '@/components/header-logo';
import { ShoppingCard } from '@/components/shopping-cart/shopping-card';
import { shoppingCart } from '@/translations/en.json';
import { Button, SafeAreaView, Text, View } from '@/ui';

type TotalPriceBarProps = {
  totalPrice?: string;
};

const TotalPriceBar = ({ totalPrice }: TotalPriceBarProps) => {
  return (
    <View className="mt-5 flex-row items-center justify-between px-4">
      <View className="flex-row items-center">
        <Text className="text-xl font-semibold">
          {shoppingCart.labels.total}
        </Text>
        <View className="mx-5 h-px w-12 items-center justify-center bg-black shadow-lg" />
        <Text className="text-xl font-semibold">{totalPrice}</Text>
      </View>
      <Button
        className="m-0 flex h-12 items-center"
        textClassName="my-2 px-2"
        label={shoppingCart.buttons.checkout}
        onPress={() => {
          router.push('/payment');
        }}
      />
    </View>
  );
};

export default function ShoppingCart() {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, refetch } =
    useShoppingCart({
      variables: { items: API_CONSTS.INITIAL_ITEMS },
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

  const productsToDisplay = data?.pages.flatMap((page) => page.lineItems) || [];

  return (
    <SafeAreaView>
      <HeaderLogo />
      <View className="mb-48 bg-light_background pb-8 pt-6">
        <FlatList
          data={productsToDisplay}
          extraData={productsToDisplay}
          className="pb-4"
          onEndReached={handleReachEnd}
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
                <ShoppingCard
                  id={item.id}
                  price={item.product.unit_price}
                  state={item.product.state}
                  name={item.product.title}
                  image_url={item.product.pictures[0]}
                  quantity={item.quantity}
                  refetch={refetch}
                />
              </View>
            );
          }}
          keyExtractor={(item) => item.id.toString()}
        />
        <TotalPriceBar totalPrice={data?.pages[0].totalPrice} />
      </View>
    </SafeAreaView>
  );
}
