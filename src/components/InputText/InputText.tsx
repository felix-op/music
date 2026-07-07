import { useAppFont, useAppTheme } from "@services";
import { TextInput as RNTextInput, StyleSheet, TextInputProps, View } from "react-native";
import { Typography } from "../Typography/Typography";

type InputVariant = "normal" | "error" | "disabled";

interface InputTextProps extends Omit<TextInputProps, 'editable'> {
    value: string;
    onChangeText: (text: string) => void;
    variant?: InputVariant;
    label?: string;
    error?: string;
}

export function InputText({
    value,
    onChangeText,
    placeholder,
    variant = "normal",
    label,
    error,
    ...props
}: InputTextProps) {
    const { theme } = useAppTheme();
    const { fontFamilyRegular } = useAppFont();

    const isDisabled = variant === "disabled";
    const isError = variant === "error" || !!error;

    let borderColor = theme.divider;
    let backgroundColor = theme.background.paper;

    if (isDisabled) {
        backgroundColor = theme.action.disabledBackground;
    } else if (isError) {
        borderColor = theme.error?.main || "#ff4444";
    }

    return (
        <View style={styles.container}>
            {label && (
                <Typography variant="body" weight="bold" style={styles.label}>
                    {label}
                </Typography>
            )}
            
            <View
                style={[
                    styles.wrapper,
                    {
                        backgroundColor,
                        borderColor,
                        borderRadius: theme.shape.borderRadius,
                        opacity: isDisabled ? 0.7 : 1,
                    },
                ]}
            >
                <RNTextInput
                    style={[
                        styles.input,
                        { fontFamily: fontFamilyRegular, color: theme.text.primary },
                    ]}
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    placeholderTextColor={theme.text.secondary}
                    editable={!isDisabled}
                    {...props}
                />
            </View>

            {error && (
                <Typography variant="caption" style={[styles.errorText, { color: theme.error?.main || "#ff4444" }]}>
                    {error}
                </Typography>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 6,
        width: "100%",
    },
    label: {
        marginLeft: 4,
    },
    wrapper: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderWidth: 1,
    },
    input: {
        flex: 1,
        fontSize: 16,
        padding: 0,
    },
    errorText: {
        marginLeft: 16,
    }
});
