import images from 'assets';

import { Image } from '@/ui';

export const HeaderLogo = () => {
  return <Image source={images.header()} className="h-14 w-full" />;
};
