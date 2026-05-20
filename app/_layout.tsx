import { Navbar } from "@components/index";
import { Stack } from "expo-router";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function RootLayout() {
  const { top, bottom, left, right } = useSafeAreaInsets();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#333",
      }}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: "#333",
            paddingTop: top,
            paddingLeft: left,
            paddingRight: right,
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
