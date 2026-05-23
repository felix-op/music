import { Navbar } from "@components/index";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FontProvider, useAppFont } from "../src/context/FontContext";
import { StatusBar } from "expo-status-bar";

// Prevent the splash screen from auto-hiding before asset loading is complete
SplashScreen.preventAutoHideAsync();

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

  const [loaded, error] = useFonts({
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "SourceCodePro-Regular": require("../assets/fonts/SourceCodePro-Regular.ttf"),
    "SourceCodePro-Bold": require("../assets/fonts/SourceCodePro-Bold.ttf"),
    "Caveat-Regular": require("../assets/fonts/Caveat.ttf"),
    "Caveat-Bold": require("../assets/fonts/Caveat.ttf"),
    "Finlandica-Regular": require("../assets/fonts/FinlandicaText.ttf"),
    "Finlandica-Bold": require("../assets/fonts/FinlandicaText-Italic.ttf"),
  });

  useEffect(() => {
    if (error) {
      console.error("Font loading error:", error);
    }
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#09070F", // Deep cosmic antigravity black
      }}>
      <StatusBar style="light" />
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
            paddingTop: top + 10,
            paddingLeft: left + 20,
            paddingRight: right + 20,
            paddingBottom: bottom,
          }
        }}
      />
      <View style={{
        position: "absolute",
        left: 20,
        right: 20,
        bottom: bottom + 20,
      }}>
        <Navbar />
      </View>
    </View>
  );
}
