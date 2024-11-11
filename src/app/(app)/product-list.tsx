import images from 'assets';
import { useRouter } from 'expo-router';
import { memo, useState } from 'react';
import { FlatList } from 'react-native';

import type { Product } from '@/api/products/types';
import { useProducts } from '@/api/products/use-products';
import { HeaderLogo } from '@/components/header-logo';
import { ProductCard } from '@/components/products-list/product-card';
import { SearchBar } from '@/components/search-bar';
import { Image, SafeAreaView, Text, TouchableOpacity, View } from '@/ui';

type ProductsListProps = {
  products: Product[];
  onEndReached: () => void;
};

const FiltersButton = ({ products }: { products: Product[] }) => {
  if (products.length === 0) {
    return;
  }
  return (
    <View className="absolute bottom-24 flex w-auto items-center justify-center self-center pb-20">
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
      <View className="flex-row justify-between px-5 pt-3">
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

const ProductsList = memo(({ products, onEndReached }: ProductsListProps) => {
  if (products.length === 0) {
    return (
      <View className="m-4 gap-4 self-center text-4xl font-semibold">
        <Text>No products found</Text>
      </View>
    );
  }

  return (
    <View className="pt-2">
      <FlatList
        onEndReached={onEndReached}
        data={products}
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
});

export default function ProductList() {
  const { back } = useRouter();
  const [query, setQuery] = useState<string>('');
  const {
    data: products,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useProducts({
    variables: { items: 7, text: query },
  });

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const clearQuery = () => {
    setQuery('');
  };

  const productsToDisplay = products?.pages.flatMap((page) => page.data) || [];

  return (
    <SafeAreaView className="flex-1">
      <HeaderLogo />
      <TouchableOpacity
        onPress={back}
        className="absolute left-2 top-[67] flex-row items-center rounded-full bg-green-600 p-2 px-4"
      >
        <Text className="text-md font-bold text-white">Back</Text>
      </TouchableOpacity>
      <SearchBar setQuery={setQuery} query={query} />
      <SearchResult query={query} clearQuery={clearQuery} />
      <View className={query === '' ? 'pb-52' : 'pb-72'}>
        <ProductsList
          products={productsToDisplay}
          onEndReached={handleLoadMore}
        />
      </View>
      <FiltersButton products={productsToDisplay} />
    </SafeAreaView>
  );
}
