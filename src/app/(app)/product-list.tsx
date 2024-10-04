import images from 'assets';
import { useEffect, useState } from 'react';

import type { Product } from '@/api/products/types';
import { useProducts } from '@/api/products/use-products';
import { HeaderLogo } from '@/components/header-logo';
import { ProductListScrollView } from '@/components/products-list/products-scroll-view';
import { SearchBar } from '@/components/search-bar';
import { Image, SafeAreaView, Text, TouchableOpacity, View } from '@/ui';

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

export default function ProducList() {
  const [page, setPage] = useState(1);
  const { data } = useProducts({ variables: { page: 1, items: 100 } });
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState<string>('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [shouldReset, setShouldReset] = useState(false);

  useEffect(() => {
    const productList = query === '' ? data?.data ?? [] : filteredProducts;
    setProducts(productList?.slice((page - 1) * 7, page * 7));
  }, [data, page, query, filteredProducts]);

  if (data === undefined) {
    return null;
  }

  const resetSearchBar = () => {
    setProducts(data.data.slice(0, 7));
    setShouldReset(true);
    setQuery('');
    setTimeout(() => setShouldReset(false), 100);
  };

  const handleProductSelect = (searchQuery: string) => {
    const queryProducts = data.data.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(queryProducts);
    setQuery(searchQuery);
    setPage(1);
    setProducts(filteredProducts.slice(0, 7));
  };

  return (
    <>
      <SafeAreaView className="flex-1">
        <HeaderLogo />
        <SearchBar
          onProductSelect={handleProductSelect}
          cleanQuery={shouldReset}
        />
        <SearchResult query={query} clearQuery={resetSearchBar} />
        <ProductListScrollView
          data={data}
          page={page}
          query={query}
          filteredProducts={filteredProducts}
          setPage={setPage}
          setProducts={setProducts}
          products={products}
        />
        <FiltersButton products={products} query={query} />
      </SafeAreaView>
    </>
  );
}
