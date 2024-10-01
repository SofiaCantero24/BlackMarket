import images from 'assets';
import { useEffect, useState } from 'react';

import { Image, Input, View } from '@/ui';

type SearchBarProps = {
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  query: string;
};

export const SearchBar = ({ setQuery, query }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setSearchTerm(query);
  }, [query]);

  return (
    <View className="w-full flex-row items-center bg-light_gray px-4 py-2">
      <View className="h-12 w-full flex-row items-center justify-between rounded-lg border-[0.5px] border-neutral-400 bg-white pl-2 pr-8">
        <View className="flex w-full items-center">
          <Input
            placeholder="Search for products"
            className="-mb-2 flex-1 p-2 text-black"
            placeholderTextColor="#000000"
            value={searchTerm}
            onChangeText={setSearchTerm}
            onSubmitEditing={() => {
              setQuery(searchTerm);
            }}
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
