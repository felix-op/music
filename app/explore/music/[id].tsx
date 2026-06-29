import { Ionicons } from "@expo/vector-icons";
import { useAppFont, useAppTheme } from "@services";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Params = {
    id: string;
    musicName?: string;
};

export default function MusicDetailPage() {
    const { id, musicName } = useLocalSearchParams<Params>();
    const { theme } = useAppTheme();
    const { fontFamilyRegular } = useAppFont();

    return (
        <View style={styles.container}>
            <Stack.Screen
                options={{
                    headerShown: true,
                    title: musicName ?? "Música",
                    animation: "slide_from_right",
                    headerBackVisible: false,
                    headerLeft: () => (
                        <Pressable
                            onPress={() => router.back()}
                            style={({ pressed }) => [
                                styles.backButton,
                                pressed && { opacity: 0.5 },
                            ]}
                        >
                            <Ionicons name="chevron-back" size={26} color={theme.text.primary} />
                        </Pressable>
                    ),
                }}
            />
            <Ionicons name="musical-note" size={64} color={theme.text.disabled} />
            <Text style={[styles.label, { fontFamily: fontFamilyRegular, color: theme.text.secondary }]}>
                {musicName ?? `Música #${id}`}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
    },
    backButton: {
        paddingRight: 8,
    },
    label: {
        fontSize: 16,
    },
});
