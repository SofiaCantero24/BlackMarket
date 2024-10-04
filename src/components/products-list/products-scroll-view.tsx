import { memo, useCallback, useEffect } from 'react';

import type { Product } from '@/api/products/types';
import { useProducts } from '@/api/products/use-products';
import { ScrollView, Text, View } from '@/ui';

import { ProductCard } from './product-card';

type HandlePageProps = {
  query: string;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  fetchedProducts: Product[];
  setFetchedProducts: React.Dispatch<React.SetStateAction<Product[]>>;
};

const ProductsList = memo(({ products }: { products: Product[] }) => {
  if (products.length === 0) {
    return (
      <View className="m-4 gap-4 self-center text-4xl font-semibold">
        <Text>No products found</Text>
      </View>
    );
  }

  return (
    <View className="m-4 gap-4 rounded-lg border">
      {products.map((product, index) => (
        <View key={index}>
          <View>
            <ProductCard
              id={product.id}
              price={product.unit_price}
              state={product.state}
              name={product.title}
              image_url={product.pictures[0]}
            />
          </View>
          {index < products.length - 1 && (
            <View className="h-px w-full bg-black" />
          )}
        </View>
      ))}
    </View>
  );
});

export const ProductListScrollView = ({
  page,
  setPage,
  products,
  query,
  setProducts,
  fetchedProducts,
  setFetchedProducts,
}: HandlePageProps & { products: Product[] }) => {
  const { data } = useProducts({ variables: { page: page, items: 7 } });

  useEffect(() => {
    if (data && data.data) {
      setFetchedProducts((prevProducts) => [...prevProducts, ...data.data]);
    }
  }, [data, setFetchedProducts]);

  useEffect(() => {
    setProducts(fetchedProducts);
  }, [fetchedProducts, setProducts]);

  const handleEndReached = useCallback(() => {
    const totalItems = data?.pagination?.count ?? 0;
    if (page * 7 - 1 < totalItems) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [page, setPage, data?.pagination.count]);

  if (data === undefined) {
    return null;
  }

  return (
    <View>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: query === '' ? 200 : 280,
        }}
        onScroll={({ nativeEvent }) => {
          const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
          const isCloseToBottom =
            layoutMeasurement.height + contentOffset.y >=
            contentSize.height - 20;
          if (isCloseToBottom) {
            handleEndReached();
          }
        }}
        scrollEventThrottle={400}
      >
        <ProductsList products={products} />
      </ScrollView>
    </View>
  );
};
