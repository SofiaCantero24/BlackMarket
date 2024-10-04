import { Button, Image, Text, TouchableOpacity, View } from '@/ui';
import { Favorite } from '@/ui/icons';

export interface ProductCardProps {
  id: number;
  name: string;
  price: string;
  state: string;
  image_url: string;
}

export const ProductCard = ({
  name,
  price,
  state,
  image_url,
}: ProductCardProps) => {
  return (
    <View className="flex-row items-center justify-between rounded-lg bg-white p-3">
      <View className="w-full flex-row items-center space-x-4">
        <Image
          source={{ uri: image_url }}
          className="flex h-32 w-32"
          contentFit="contain"
        />
        <View className="w-full flex-1 px-4">
          <View className="flex-row items-center justify-between">
            <View className="h-full w-3/4">
              <Text className="text-xl font-bold">{name}</Text>
            </View>
            <View className="h-full">
              <View className="h-12 w-12 rounded-full border border-black">
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
          </View>
          <View className="mb-2 mt-1 flex-row items-center space-x-2">
            <View
              className={`rounded-md rounded-tl-none px-2 py-1 ${
                state === 'used' ? 'bg-restored' : 'bg-new'
              }`}
            >
              <Text className="text-xs font-semibold text-white">
                {state === 'used' ? 'Used' : 'New'}
              </Text>
            </View>
          </View>
          <View className="flex-row items-center justify-between">
            <Text className="text-lg font-bold">{price}</Text>
            <Button label="Add to cart" />
          </View>
        </View>
      </View>
    </View>
  );
};
