import { useState } from 'react';
import { FlatList } from 'react-native';

import { Image, TouchableOpacity, View } from '@/ui';

export const ImageDisplayer = ({
  images,
}: {
  images: string[] | undefined;
}) => {
  const [selectedImage, setSelectedImage] = useState(0);

  if (images === undefined) {
    return;
  }

  return (
    <>
      <View className="h-68 w-68 my-3 w-full rounded-lg">
        <Image
          source={{ uri: images[selectedImage] }}
          className="h-72 w-full"
          contentFit="contain"
        />
      </View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={images}
        keyExtractor={(index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            className="mr-4 h-28 w-28 rounded-md"
            onPress={() => setSelectedImage(index)}
          >
            <Image
              source={{ uri: item }}
              contentFit="contain"
              className="h-28 w-28 rounded-md"
            />
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingBottom: 16 }}
      />
    </>
  );
};
