import images from 'assets';
import { useEffect, useState } from 'react';

import type { FetchProductsResponse, Product } from '@/api/products/types';
import { useProducts } from '@/api/products/use-products';
import { HeaderLogo } from '@/components/header-logo';
import { ProductCard } from '@/components/products-list/product-card';
import { SearchBar } from '@/components/search-bar';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from '@/ui';

type PageControllerProps = {
  handlePrevPage: (props: HandlePageProps) => void;
  handleNextPage: (props: HandlePageProps) => void;
};

type HandlePageProps = {
  data: FetchProductsResponse;
  page: number;
  query: string | undefined;
  filteredProducts: Product[];
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
};

const PageController = ({
  handlePrevPage,
  handleNextPage,
  data,
  page,
  query,
  filteredProducts,
  setPage,
  setProducts,
}: PageControllerProps & HandlePageProps) => {
  const handlePageProps = {
    data,
    page,
    query,
    filteredProducts,
    setPage,
    setProducts,
  };
  return (
    <View className="flex-row justify-between px-5 pb-2">
      <TouchableOpacity
        onPress={() => handlePrevPage(handlePageProps)}
        className={`rounded-3xl bg-dark_violet p-4 px-6`}
      >
        <Text className="text-lg text-white">Previous</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleNextPage(handlePageProps)}
        className={`rounded-3xl bg-dark_violet p-4 px-6`}
      >
        <Text className="text-lg text-white">Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const ProductsList = ({ products }: { products: Product[] }) => {
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
};

const FiltersButton = ({ products }: { products: Product[] }) => {
  if (products.length === 0) {
    return;
  }
  return (
    <View className="absolute bottom-28 flex w-auto items-center justify-center self-center pb-20">
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
  query: string | undefined;
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

const handleNextPage = ({
  data,
  page,
  query,
  filteredProducts,
  setPage,
}: HandlePageProps) => {
  const hasMoreProducts =
    query === undefined || query === ''
      ? data.data.length > page * 7
      : filteredProducts.length > page * 7;

  if (hasMoreProducts) {
    setPage((prevPage) => prevPage + 1);
  }
};

const handlePrevPage = ({ page, setPage }: HandlePageProps) => {
  if (page > 1) {
    setPage((prevPage) => prevPage - 1);
  }
};

export default function ProducList() {
  const [page, setPage] = useState(1);
  const { data } = useProducts({
    variables: { page: 1, items: 1000 },
  });
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState<string>('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (data && (query === undefined || query === '')) {
      setProducts(data.data.slice((page - 1) * 7, page * 7));
    } else {
      setProducts(filteredProducts.slice((page - 1) * 7, page * 7));
    }
  }, [data, page, query, filteredProducts]);

  if (data === undefined) {
    return null;
  }

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
        <SearchBar onProductSelect={handleProductSelect} />
        <SearchResult
          query={query}
          clearQuery={() => {
            setQuery('');
            setProducts(data.data.slice(0, 7));
          }}
        />
        <View>
          <ScrollView
            contentContainerStyle={{
              paddingBottom: query === undefined || query === '' ? 200 : 280,
            }}
          >
            <ProductsList products={products} />
            <PageController
              handleNextPage={handleNextPage}
              handlePrevPage={handlePrevPage}
              data={data}
              query={query}
              page={page}
              filteredProducts={filteredProducts}
              setPage={setPage}
              setProducts={setProducts}
            />
          </ScrollView>
        </View>
        <FiltersButton products={products} />
      </SafeAreaView>
    </>
  );
}
