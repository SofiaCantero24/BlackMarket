import type { FetchProductsResponse, Product } from '@/api/products/types';
import { ScrollView, Text, TouchableOpacity, View } from '@/ui';

import { ProductCard } from './product-card';

type HandlePageProps = {
  data: FetchProductsResponse;
  page: number;
  query: string;
  filteredProducts: Product[];
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
};

const handleNextPage = ({
  data,
  page,
  query,
  filteredProducts,
  setPage,
}: HandlePageProps) => {
  const hasMoreProducts =
    query === ''
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

const PageController = (handlePageProps: HandlePageProps) => {
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

export const ProductListScrollView = ({
  data,
  page,
  query,
  filteredProducts,
  setPage,
  setProducts,
  products,
}: HandlePageProps & { products: Product[] }) => {
  return (
    <View>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: query === '' ? 200 : 280,
        }}
      >
        <ProductsList products={products} />
        <PageController
          data={data}
          page={page}
          query={query}
          filteredProducts={filteredProducts}
          setPage={setPage}
          setProducts={setProducts}
        />
      </ScrollView>
    </View>
  );
};
