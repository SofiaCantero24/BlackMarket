import images from 'assets';

import { Button, Image, Text, TouchableOpacity, View } from '@/ui';
import { Favorite } from '@/ui/icons';

interface ProductCardProps {
  name: string;
  price: number;
  status: string;
}

export const ProductCard = ({ name, price, status }: ProductCardProps) => {
  return (
    <View className="flex-row items-center justify-between rounded-lg bg-white p-3 shadow">
      <View className="w-full flex-row items-center space-x-4">
        <Image
          source={images.dummyProduct()}
          className="h-36 w-24"
          contentFit="contain"
        />
        <View className="w-full flex-1 px-4">
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-xl font-bold">{name}</Text>
            </View>
            <View className="rounded-full border border-black">
              <TouchableOpacity
                className="flex-auto rounded-full p-2"
                activeOpacity={0.7}
              >
                <Favorite
                  color="#ffffff"
                  stroke="#000000"
                  strokeWidth={1}
                  viewBox="-1 0 20 15"
                />
              </TouchableOpacity>
            </View>
          </View>
          <View className="mt-1 flex-row items-center space-x-2">
            <View className="rounded-md rounded-tl-none bg-green-500 px-2 py-1">
              <Text className="text-xs font-semibold text-white">{status}</Text>
            </View>
          </View>
          <View className="flex-row items-center justify-between">
            <Text className="text-lg font-bold">${price}</Text>
            <Button label="Add to cart" />
          </View>
        </View>
      </View>
    </View>
  );
};
