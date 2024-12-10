import { Redirect, SplashScreen, Tabs } from 'expo-router';
import { useCallback, useEffect } from 'react';

import { useAuth, useIsFirstTime } from '@/core';
import { colors, View } from '@/ui';
import {
  Cart as CartIcon,
  Favorite as FavoriteIcon,
  Home as HomeIcon,
  Menu as MenuIcon,
  Sell as SellIcon,
} from '@/ui/icons';

const renderIcon = (
  IconComponent: React.ComponentType<{ color: string }>,
  color: string,
  focused: boolean
) => (
  <View className={focused ? 'rounded-full bg-light_gray p-3' : 'p-3'}>
    <IconComponent color={color} />
  </View>
);

const tabs = [
  {
    name: 'index',
    title: 'Feed',
    icon: HomeIcon,
    testID: 'feed-tab',
    headerShown: false,
  },
  {
    name: 'product-list',
    title: 'Product List',
    testID: 'product-list-tab',
    icon: SellIcon,
    headerShown: false,
  },
  {
    name: 'purchases',
    title: 'Purchases',
    testID: 'purchases-tab',
    icon: SellIcon,
    headerShown: false,
  },
  {
    name: 'shopping-cart',
    title: 'Shopping Cart',
    icon: CartIcon,
    headerShown: false,
  },
  {
    name: 'favorites',
    title: 'Settings',
    icon: FavoriteIcon,
    testID: 'payment-tab',
    headerShown: false,
  },
  {
    name: 'settings',
    title: 'Settings',
    icon: MenuIcon,
    testID: 'setting-tab',
    headerShown: false,
  },
  {
    name: 'payment',
    title: 'Settings',
    icon: MenuIcon,
    testID: 'setting-tab',
    headerShown: false,
  },
];

export default function TabLayout() {
  const status = useAuth.use.status();
  const [isFirstTime] = useIsFirstTime();
  const hideSplash = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);
  useEffect(() => {
    if (status !== 'idle') {
      setTimeout(() => {
        hideSplash();
      }, 1000);
    }
  }, [hideSplash, status]);

  if (isFirstTime) {
    return <Redirect href="/onboarding" />;
  }
  if (status === 'signOut') {
    return <Redirect href="/login" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: colors.dark_violet,
          paddingTop: 10,
          paddingBottom: 25,
        },
        tabBarActiveTintColor: colors.dark_violet,
        tabBarInactiveTintColor: colors.white,
        tabBarShowLabel: false,
      }}
    >
      {tabs.map(({ name, title, icon, testID, headerShown = true }) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            title,
            tabBarIcon: ({ color, focused }) =>
              renderIcon(icon, color, focused),
            tabBarTestID: testID,
            headerShown,
            tabBarButton:
              name === 'product-list' || name === 'payment'
                ? () => null
                : undefined,
          }}
        />
      ))}
    </Tabs>
  );
}
