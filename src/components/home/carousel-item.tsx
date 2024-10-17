import type { Product } from '@/api/products/types';
import { Image, Text, View } from '@/ui';
import { Favorite } from '@/ui/icons';
type IconType = {
  focused: boolean;
};
const Icon = ({ focused, ...props }: IconType) => {
  const fillColor = focused ? 'red' : 'none';
  return (
    <View className="m-2">
      <Favorite
        color={fillColor}
        stroke={`${focused ? 'red' : 'black'}`}
        strokeWidth="4%"
        fill={fillColor}
        {...props}
      />
    </View>
  );
};
export const CarouselItem = ({ item }: { item: Product }) => {
  return (
    <>
      <View className="h-64 w-48 rounded-lg bg-white shadow shadow-gray-600">
        <View className="items-center">
          <Image
            source={item.pictures[0]}
            className="m-2 h-32 w-32 rounded-md object-cover"
            contentFit="contain"
          />
        </View>
        <View className="h-px bg-black shadow-lg shadow-gray-400 " />
        <View className="border-t-1 flex-row items-center justify-between border-t border-black px-4 pt-2 opacity-100">
          <Text className="text-lg font-semibold">{item.unit_price}</Text>
          <View
            className={`${
              item.state === 'totaly_new' ? 'bg-new' : 'bg-restored'
            } flex items-center justify-center rounded-md p-0.5 px-2`}
          >
            <Text className="text-white">
              {`${item.state === 'totaly_new' ? 'New' : 'Restored'}`}
            </Text>
          </View>
        </View>
        <View className="h-18 w-full flex-row items-center justify-between pl-4 pr-2 pt-2">
          <Text numberOfLines={2} className="w-9/12 font-semibold">
            {item.title}
          </Text>
          <Icon focused={false} />
        </View>
      </View>
    </>
  );
};
