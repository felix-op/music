import { Navbar } from "@components";
import { FontProvider, ThemeProvider, useAppFont, useAppTheme } from "@services";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const client = new QueryClient();

export default function RootLayout() {
  return (
    <ThemeProvider>
      <FontProvider>
        <QueryClientProvider client={client}>
          <InnerLayout />
        </QueryClientProvider>
      </FontProvider>
    </ThemeProvider>
  );
}

function InnerLayout() {
  const { theme } = useAppTheme();
  const { top, bottom, left, right } = useSafeAreaInsets();
  const { fontFamilyBold } = useAppFont();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.background.default, // Deep cosmic antigravity black
      }}>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          headerShadowVisible: false, // Removes the header border/shadow entirely
          headerStyle: {
            backgroundColor: theme.background.default, // Seamless header integration
          },
          headerTintColor: theme.text.primary, // Pure white text for extreme readability
          headerTitleStyle: {
            fontFamily: fontFamilyBold, // Dynamically selected font!
            fontSize: 22,
          },
          contentStyle: {
            backgroundColor: theme.background.default, // Seamless blend with header!
            paddingLeft: left + 10,
            paddingRight: right + 10,
          }
        }}
      />
      <View style={{
        position: "absolute",
        left: 10,
        right: 10,
        bottom: bottom + 20,
      }}>
        <Navbar />
      </View>
    </View>
  );
}
