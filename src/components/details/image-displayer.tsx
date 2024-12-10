import { useState } from 'react';
import { FlatList } from 'react-native';

import { useAddFavorite } from '@/api/favorites/add-favorite';
import { useRemoveFavorite } from '@/api/favorites/remove-favorite';
import { Image, showErrorMessage, TouchableOpacity, View } from '@/ui';
import { Favorite } from '@/ui/icons';

type ImageDisplayerProps = {
  images: string[] | undefined;
  isFavorite: boolean;
  refetch: () => void;
  id: number;
};

type IconType = {
  focused: boolean;
};

const Icon = ({ focused, ...props }: IconType) => {
  const fillColor = focused ? '#FF0000' : '#ffffff';
  return (
    <View className="m-2">
      <Favorite
        color={fillColor}
        stroke="black"
        strokeWidth="4%"
        fill={fillColor}
        {...props}
      />
    </View>
  );
};

export const ImageDisplayer = ({
  images,
  isFavorite,
  refetch,
  id,
}: ImageDisplayerProps) => {
  const { mutate: addFavorite } = useAddFavorite({
    onSuccess: () => {
      refetch();
    },
    onError: () => {
      showErrorMessage('Something went wrong');
    },
  });
  const { mutate: removeFavorite } = useRemoveFavorite({
    onSuccess: () => {
      refetch();
    },
    onError: () => {
      showErrorMessage('Something went wrong');
    },
  });
  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(id);
    } else {
      addFavorite(id);
    }
  };
  const [selectedImage, setSelectedImage] = useState(0);
  if (images === undefined) {
    return;
  }
  return (
    <>
      <View className="h-68 w-68 relative my-3 w-full rounded-lg">
        <Image
          source={{ uri: images[selectedImage] }}
          className="h-72 w-full"
          contentFit="contain"
        />
        <TouchableOpacity
          onPress={toggleFavorite}
          className="absolute bottom-2 right-2 z-10"
        >
          <Icon focused={isFavorite} />
        </TouchableOpacity>
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
