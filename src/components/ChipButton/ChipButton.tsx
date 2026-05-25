import { Pressable, Text } from "react-native";
import { styles } from "./estilos";
import { useAppFont } from "@services";

type TProps = {
    title: string;
    active?: boolean;
    onPress?: () => void;
};

export function ChipButton({ title, active = false, onPress }: TProps) {
    const { fontFamilyBold, fontFamilyRegular } = useAppFont();

    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [
                styles.button,
                active ? styles.buttonActive : styles.buttonInactive,
                pressed && { opacity: 0.85, transform: [{ scale: 0.98 }] } // Subtle micro-animation when pressed
            ]}
        >
            <Text
                style={[
                    styles.text,
                    { fontFamily: active ? fontFamilyBold : fontFamilyRegular },
                    active ? styles.textActive : styles.textInactive
                ]}
            >
                {title}
            </Text>
        </Pressable>
    );
}
