import { HeaderLogo } from '@/components/header-logo';
import { SearchBar } from '@/components/search-bar';
import { SafeAreaView } from '@/ui';

export default function Feed() {
  return (
    <SafeAreaView>
      <HeaderLogo />
      <SearchBar setQuery={() => {}} query={''} />
    </SafeAreaView>
  );
}
