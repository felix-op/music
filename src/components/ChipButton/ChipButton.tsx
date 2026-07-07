import { Pressable } from "react-native";
import { Typography } from "@components";
import { styles } from "./estilos";

type TProps = {
    title: string;
    active?: boolean;
    onPress?: () => void;
};

export function ChipButton({ title, active = false, onPress }: TProps) {
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [
                styles.button,
                active ? styles.buttonActive : styles.buttonInactive,
                pressed && { opacity: 0.85, transform: [{ scale: 0.98 }] } // Subtle micro-animation when pressed
            ]}
        >
            <Typography
                variant="bodySmall"
                weight={active ? "bold" : "regular"}
                color={active ? "white" : "disabled"}
                style={active ? styles.textActive : styles.textInactive}
            >
                {title}
            </Typography>
        </Pressable>
    );
}
