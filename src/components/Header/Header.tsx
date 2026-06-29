import { Ionicons } from "@expo/vector-icons";
import { useAppTheme } from "@services";
import { router, Stack } from "expo-router";
import { Pressable } from "react-native";
import { styles } from "./estilos";

type TProps = {
    title: string;
    hideBack?: boolean;
};

export function Header({ title, hideBack = false }: TProps) {
    const { theme } = useAppTheme();
        
    return (
        <Stack.Screen
            options={{
                headerShown: true,
                title,
                headerBackVisible: !hideBack,
                headerLeft: () => !hideBack ? (
                    <Pressable
                        onPress={() => router.back()}
                        style={({ pressed }) => [
                            styles.backButton,
                            { backgroundColor: theme.background.paper },
                            pressed && { opacity: 0.7 },
                        ]}
                    >
                        <Ionicons
                            name="chevron-back"
                            size={24}
                            color={theme.text.primary}
                        />
                    </Pressable>
                ) : null,
            }}
        />
    );
}
