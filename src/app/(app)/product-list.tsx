import images from 'assets';
import { useEffect, useState } from 'react';

import type { Pagination } from '@/api';
import type { Product } from '@/api/products/types';
import { useProducts } from '@/api/products/use-products';
import { HeaderLogo } from '@/components/header-logo';
import { ProductCard } from '@/components/products-list/product-card';
import { SearchBar } from '@/components/search-bar';
import {
  FocusAwareStatusBar,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from '@/ui';

type PageControllerProps = {
  handlePrevPage: () => void;
  handleNextPage: () => void;
  pagination: Pagination;
};

const PageController = ({ props }: { props: PageControllerProps }) => {
  return (
    <View className="flex-row justify-between px-5 pb-2">
      <TouchableOpacity
        onPress={props.handlePrevPage}
        disabled={props?.pagination.page === 1} // Disable previous button on first page
        className={`rounded-3xl bg-dark_violet p-4 px-6`}
      >
        <Text className="text-lg text-white">Previous</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={props.handleNextPage}
        disabled={
          props.pagination.next_url === '/api/v1/products?page=&items=7'
        } // Disable next button if no next page
        className={`rounded-3xl bg-dark_violet p-4 px-6`}
      >
        <Text className="text-lg text-white">Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const FiltersButton = () => {
  return (
    <View className="absolute bottom-28 flex w-auto items-center justify-center self-center pb-20">
      <TouchableOpacity className="flex-row items-center gap-4 rounded-full bg-dark_violet p-4 px-8">
        <Text className="text-lg font-bold text-white">Filers</Text>
        <Image className="h-4 w-4" source={images.filterIcon()} />
      </TouchableOpacity>
    </View>
  );
};

const SearchResult = () => {
  return (
    <View className="flex-row justify-between px-5 pt-6">
      <Text className="text-lg text-gray-600">You searched for “chairs”</Text>
      <TouchableOpacity>
        <Text className="text-lg text-link">Clear all</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function ProducList() {
  const [page, setPage] = useState(1);
  const { data } = useProducts({ variables: { page: page } });
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (data) {
      setProducts(data.data);
    }
  }, [data]);

  if (!data?.pagination) {
    return;
  }

  const handleNextPage = () => {
    if (data?.pagination.next_url) {
      setPage((prevPage) => prevPage + 1);
    }
  };
  const handlePrevPage = () => {
    if (page > 1 && data?.pagination.prev_url) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <>
      <FocusAwareStatusBar />
      <SafeAreaView className="flex-1">
        <HeaderLogo />
        <SearchBar />
        <SearchResult />
        <View>
          <ScrollView contentContainerStyle={{ paddingBottom: 280 }}>
            <View className="m-4 gap-4 rounded-lg border pt-2">
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
            <PageController
              props={{
                pagination: data.pagination,
                handleNextPage,
                handlePrevPage,
              }}
            />
          </ScrollView>
        </View>
        <FiltersButton />
      </SafeAreaView>
    </>
  );
}
