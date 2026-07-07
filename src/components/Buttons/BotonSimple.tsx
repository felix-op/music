import { useAppTheme } from "@services";
import React from "react";
import { Pressable, PressableProps, StyleProp, StyleSheet, ViewStyle } from "react-native";

export type ButtonVariant = "primary" | "secondary" | "surface" | "transparent";

export interface BotonSimpleProps extends PressableProps {
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>;
    variant?: ButtonVariant;
}

export function BotonSimple({ children, style, variant = "primary", ...props }: BotonSimpleProps) {
    const { theme } = useAppTheme();

    let backgroundColor = theme.primary.main;
    if (variant === "secondary") backgroundColor = theme.secondary.main;
    if (variant === "surface") backgroundColor = theme.action.disabledBackground;
    if (variant === "transparent") backgroundColor = "transparent";

    return (
        <Pressable
            style={({ pressed }) => [
                styles.button,
                { 
                    borderRadius: theme.shape.borderRadius,
                    backgroundColor 
                },
                pressed && { opacity: 0.8 },
                typeof style === 'function' ? style({ pressed }) : style,
            ]}
            {...props}
        >
            {children}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        gap: 8,
    },
});
