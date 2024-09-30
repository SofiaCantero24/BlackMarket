import images from 'assets';

import { Image, Input, View } from '@/ui';

export const SearchBar = () => {
  return (
    <View className="w-full flex-row items-center bg-light_gray px-4 py-2">
      <View className="h-12 w-full flex-row items-center justify-between rounded-lg border-[0.5px] border-neutral-400 bg-white pl-2 pr-8">
        <View className="w-full flex-row items-center">
          <Input
            placeholder="Search for products"
            className="-mb-2 p-2 text-black"
            placeholderTextColor="#000000"
          />
        </View>
        <View className="flex-row">
          <Image
            contentFit="contain"
            source={images.search()}
            className="mr-2 h-4 w-4"
          />
        </View>
      </View>
    </View>
  );
};
