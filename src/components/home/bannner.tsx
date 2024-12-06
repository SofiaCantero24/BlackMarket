import { Image, View } from '@/ui';

type BannerProps = {
  background: string;
  alignment: 'left' | 'right';
  image: any;
  children: React.ReactNode;
};

export const Banner = ({
  background,
  alignment,
  image,
  children,
}: BannerProps) => {
  const isLeftAligned = alignment === 'left';

  return (
    <View
      className={`my-6 flex h-40 w-full gap-px overflow-hidden rounded-lg px-6 ${
        isLeftAligned ? 'flex-row' : 'flex-row-reverse'
      }`}
    >
      <Image
        source={image}
        contentFit="cover"
        className={`h-full w-[47%] ${
          isLeftAligned ? 'rounded-l-lg' : 'rounded-r-lg'
        }`}
      />

      <View
        className={`flex h-full w-[53%] items-start justify-center p-6 ${background} ${
          isLeftAligned ? 'rounded-r-lg' : 'rounded-l-lg'
        } ${background === 'dark' ? 'bg-dark_violet' : ''}`}
      >
        {children}
      </View>
    </View>
  );
};
