import images from 'assets';

import { SearchBar } from '@/components/search-bar';
import { Image, SafeAreaView } from '@/ui';

export default function Feed() {
  return (
    <SafeAreaView>
      <Image source={images.header()} className="h-14 w-full" />
      <SearchBar />
    </SafeAreaView>
  );
}
