import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="auth/log-in" />
      <Stack.Screen name="index" />
    </Stack>
  );
}
