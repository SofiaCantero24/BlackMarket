import { memo, useCallback, useEffect } from 'react';
import { FlatList } from 'react-native';

import type { Product } from '@/api/products/types';
import { useProducts } from '@/api/products/use-products';
import { Text, View } from '@/ui';

import { ProductCard } from './product-card';

type HandlePageProps = {
  query: string;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  fetchedProducts: Product[];
  setFetchedProducts: React.Dispatch<React.SetStateAction<Product[]>>;
};

type ProductsListProps = {
  products: Product[];
  onEndReached: () => void;
  onScroll: (event: any) => void;
};

const ProductsList = memo(
  ({ products, onEndReached, onScroll }: ProductsListProps) => {
    if (products.length === 0) {
      return (
        <View className="m-4 gap-4 self-center text-4xl font-semibold">
          <Text>No products found</Text>
        </View>
      );
    }

    return (
      <View className="mt-4">
        <FlatList
          onEndReached={onEndReached}
          data={products}
          onScroll={onScroll}
          renderItem={({ item, index }) => {
            const isFirstItem = index === 0;
            const isLastItem = index === products.length - 1;

            return (
              <View
                className={`mx-4 border ${isFirstItem ? 'rounded-t-lg' : ''} ${
                  isLastItem ? 'rounded-b-lg' : ''
                }`}
              >
                <ProductCard
                  id={item.id}
                  price={item.unit_price}
                  state={item.state}
                  name={item.title}
                  image_url={item.pictures[0]}
                />
              </View>
            );
          }}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    );
  }
);

export const ProductListScrollView = ({
  page,
  setPage,
  products,
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

  const handleScroll = useCallback(
    ({ nativeEvent }: any) => {
      const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
      const isCloseToBottom =
        layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
      if (isCloseToBottom) {
        handleEndReached();
      }
    },
    [handleEndReached]
  );

  if (data === undefined) {
    return null;
  }

  return (
    <View className="mb-52">
      <ProductsList
        products={products}
        onEndReached={handleEndReached}
        onScroll={handleScroll}
      />
    </View>
  );
};
