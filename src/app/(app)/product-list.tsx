import images from 'assets';
import { memo, useCallback, useEffect, useState } from 'react';
import { FlatList } from 'react-native';

import type { FetchProductsResponse, Product } from '@/api/products/types';
import { useProducts } from '@/api/products/use-products';
import { HeaderLogo } from '@/components/header-logo';
import { ProductCard } from '@/components/products-list/product-card';
import { SearchBar } from '@/components/search-bar';
import { Image, SafeAreaView, Text, TouchableOpacity, View } from '@/ui';

type ProductsListProps = {
  products: Product[];
  onEndReached: () => void;
  onScroll: (event: any) => void;
};

const FiltersButton = ({
  products,
  query,
}: {
  products: Product[];
  query: string;
}) => {
  if (products.length === 0) {
    return;
  }
  return (
    <View
      className={`absolute ${
        query === '' ? 'bottom-20' : 'bottom-28'
      } flex w-auto items-center justify-center self-center pb-20`}
    >
      <TouchableOpacity className="flex-row items-center gap-4 rounded-full bg-dark_violet p-4 px-8">
        <Text className="text-lg font-bold text-white">Filers</Text>
        <Image className="h-4 w-4" source={images.filterIcon()} />
      </TouchableOpacity>
    </View>
  );
};

const SearchResult = ({
  query,
  clearQuery,
}: {
  query: string;
  clearQuery: () => void;
}) => {
  if (query) {
    return (
      <View className="flex-row justify-between px-5 pt-6">
        <Text className="text-lg text-gray-600">
          You searched for "{query}”
        </Text>
        <TouchableOpacity onPress={clearQuery}>
          <Text className="text-lg text-link">Clear all</Text>
        </TouchableOpacity>
      </View>
    );
  }
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

const useProductPagination = (
  page: number,
  data: FetchProductsResponse | undefined,
  setPage: React.Dispatch<React.SetStateAction<number>>
) => {
  const handleEndReached = useCallback(() => {
    if (page * 7 - 1 < (data?.pagination?.count ?? 0)) {
      setPage((prev) => prev + 1);
    }
  }, [page, data, setPage]);

  const handleScroll = useCallback(
    ({ nativeEvent }: any) => {
      const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
      if (
        layoutMeasurement.height + contentOffset.y >=
        contentSize.height - 20
      ) {
        handleEndReached();
      }
    },
    [handleEndReached]
  );

  return { handleEndReached, handleScroll };
};

export default function ProducList() {
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);
  const { data } = useProducts({ variables: { page: page, items: 7 } });
  const [fetchedProducts, setFetchedProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState<string>('');
  const [shouldReset, setShouldReset] = useState(false);
  const { handleEndReached, handleScroll } = useProductPagination(
    page,
    data,
    setPage
  );

  const resetSearchBar = () => {
    setProducts(fetchedProducts);
    setShouldReset(true);
    setQuery('');
    setTimeout(() => setShouldReset(false), 100);
  };

  const handleProductSelect = (searchQuery: string) => {
    if (searchQuery === '') {
      resetSearchBar();
      return;
    }
    const queryProducts = fetchedProducts.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setQuery(searchQuery);
    setProducts(queryProducts.slice(0, 7));
  };

  useEffect(() => {
    if (data?.data) {
      setFetchedProducts((prev) => [...prev, ...data.data]);
    }
  }, [data]);

  useEffect(() => setProducts(fetchedProducts), [fetchedProducts]);

  return (
    <SafeAreaView className="flex-1">
      <HeaderLogo />
      <SearchBar
        onProductSelect={handleProductSelect}
        cleanQuery={shouldReset}
      />
      <SearchResult query={query} clearQuery={resetSearchBar} />
      <View className="mb-52">
        <ProductsList
          products={products}
          onEndReached={handleEndReached}
          onScroll={handleScroll}
        />
      </View>
      <FiltersButton products={products} query={query} />
    </SafeAreaView>
  );
}
