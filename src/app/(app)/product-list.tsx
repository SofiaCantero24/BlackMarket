import images from 'assets';

import { HeaderLogo } from '@/components/header-logo';
import type { ProductCardProps } from '@/components/products-list/product-card';
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

const products: ProductCardProps[] = [
  {
    id: '1',
    name: 'Baumler Company Wood Chair 1',
    price: 36,
    status: 'Restored',
  },
  {
    id: '2',
    name: 'Baumler Company Wood Chair 2',
    price: 36,
    status: 'Restored',
  },
  {
    id: '3',
    name: 'Baumler Company Wood Chair 3',
    price: 36,
    status: 'Restored',
  },
  {
    id: '4',
    name: 'Baumler Company Wood Chair',
    price: 36,
    status: 'Restored',
  },
  {
    id: '5',
    name: 'Baumler Company Wood Chair',
    price: 36,
    status: 'Restored',
  },
];

export default function ProducList() {
  return (
    <>
      <FocusAwareStatusBar />
      <SafeAreaView className="flex-1">
        <HeaderLogo />
        <SearchBar />
        <View>
          <ScrollView contentContainerStyle={{ paddingBottom: 200 }}>
            <View className="flex-row justify-between px-5 pb-2 pt-6">
              <Text className="text-lg text-gray-600">
                You searched for “chairs”
              </Text>
              <TouchableOpacity>
                <Text className="text-lg text-link">Clear all</Text>
              </TouchableOpacity>
            </View>
            <View className="m-4 gap-4 rounded-lg border">
              {products.map((product, index) => (
                <View>
                  <View className="pt-3">
                    <ProductCard
                      id={product.id}
                      price={product.price}
                      status={product.status}
                      name={product.name}
                    />
                  </View>
                  {index < products.length - 1 && (
                    <View className="h-px w-full bg-black" />
                  )}
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
        <View className="absolute bottom-14 flex w-full items-center justify-center pb-20">
          <TouchableOpacity className="flex-row items-center gap-4 rounded-full bg-dark_violet p-4 px-6">
            <Text className="text-lg font-bold text-white">Filers</Text>
            <Image className="h-4 w-4" source={images.filterIcon()} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
}
