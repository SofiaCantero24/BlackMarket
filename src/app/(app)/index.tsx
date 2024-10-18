import { HeaderLogo } from '@/components/header-logo';
import { HorizontalCarousel } from '@/components/home/carousel';
import { SafeAreaView } from '@/ui';

export default function Feed() {
  return (
    <SafeAreaView>
      <HeaderLogo />
      <HorizontalCarousel />
    </SafeAreaView>
  );
}
