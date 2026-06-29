import { Ionicons } from "@expo/vector-icons";
import { useAppTheme } from "@services";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Params = {
    id: string;
    nombre?: string;
};

export default function AlbumDetailPage() {
    const { id, nombre } = useLocalSearchParams<Params>();
    const { theme } = useAppTheme();

    return (
        <View style={styles.container}>
            <Stack.Screen
                options={{
                    headerShown: true,
                    title: nombre ?? "Álbum",
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
                            <Ionicons
                                name="chevron-back"
                                size={26}
                                color={theme.text.primary}
                            />
                        </Pressable>
                    ),
                }}
            />
            <Text style={[styles.placeholder, { color: theme.text.secondary }]}>
                Album #{id}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    backButton: {
        paddingRight: 8,
    },
    placeholder: {
        fontSize: 16,
    },
});
