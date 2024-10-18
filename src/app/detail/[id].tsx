import { useLocalSearchParams } from 'expo-router';

import { useGetItemDetails } from '@/api/products/use-details';
import { Text, View } from '@/ui';

export default function DetailsScreen() {
  const { id } = useLocalSearchParams();
  const { data } = useGetItemDetails(Number(id));

  return (
    <View>
      <Text>{String(data)}</Text>
    </View>
  );
}
