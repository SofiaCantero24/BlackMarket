import { HeaderLogo } from '@/components/header-logo';
import { HorizontalCarousel } from '@/components/home/carousel';
import { SearchBar } from '@/components/search-bar';
import { SafeAreaView } from '@/ui';

export default function Feed() {
  return (
    <SafeAreaView>
      <HeaderLogo />
      <SearchBar onProductSelect={() => {}} cleanQuery={true} />
      <HorizontalCarousel />
    </SafeAreaView>
  );
}
