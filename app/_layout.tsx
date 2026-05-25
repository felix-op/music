import { Navbar } from "@components";
import { Stack } from "expo-router";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FontProvider, useAppFont } from "@services";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <FontProvider>
      <InnerLayout />
    </FontProvider>
  );
}

function InnerLayout() {
  const { top, bottom, left, right } = useSafeAreaInsets();
  const { fontFamilyBold } = useAppFont();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#09070F", // Deep cosmic antigravity black
        paddingTop: top,
      }}>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
          headerShadowVisible: false, // Removes the header border/shadow entirely
          headerStyle: {
            backgroundColor: "#09070F", // Seamless header integration
          },
          headerTintColor: "#ffffff", // Pure white text for extreme readability
          headerTitleStyle: {
            fontFamily: fontFamilyBold, // Dynamically selected font!
            fontSize: 22,
          },
          contentStyle: {
            backgroundColor: "#09070F", // Seamless blend with header!
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
