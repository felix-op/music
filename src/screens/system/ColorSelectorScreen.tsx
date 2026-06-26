import React from "react";
import { ScrollView, StyleSheet, Text, View, Pressable } from "react-native";
import { useAppFont, useAppTheme, ThemeColors } from "@services";

const COLOR_OPTIONS: Record<keyof ThemeColors, string[]> = {
    background: ["#09070F", "#000000", "#111827", "#1E1E2E", "#0F172A", "#1a1a1a"],
    surface: ["#151124", "#1F2937", "#27272A", "#313244", "#1E293B", "#2a2a2a"],
    primary: ["#8B5CF6", "#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#EC4899", "#A855F7"],
    secondary: ["#00F2FE", "#60A5FA", "#34D399", "#FBBF24", "#F87171", "#F472B6", "#C084FC"],
    text: ["#ffffff", "#F9FAFB", "#F3F4F6", "#E2E8F0", "#f8f9fa", "#e9ecef"],
    textMuted: ["#a6a0c5", "#9CA3AF", "#6B7280", "#94A3B8", "#adb5bd", "#6c757d"],
};

const COLOR_LABELS: Record<keyof ThemeColors, string> = {
    background: "Fondo Principal",
    surface: "Fondo Secundario (Cards)",
    primary: "Color Primario (Destacado)",
    secondary: "Color Secundario (Destacado)",
    text: "Texto Principal",
    textMuted: "Texto Secundario",
};

export default function ColorSelectorScreen() {
    const { fontFamilyBold, fontFamilyRegular } = useAppFont();
    const { colors, setThemeColor } = useAppTheme();

    const renderColorRow = (key: keyof ThemeColors) => {
        const selectedColor = colors[key];
        const options = COLOR_OPTIONS[key];
        const label = COLOR_LABELS[key];

        return (
            <View key={key} style={styles.rowContainer}>
                <Text style={[styles.rowLabel, { fontFamily: fontFamilyBold, color: colors.text }]}>
                    {label}
                </Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    {options.map((colorItem) => {
                        const isSelected = selectedColor.toLowerCase() === colorItem.toLowerCase();
                        return (
                            <Pressable
                                key={colorItem}
                                onPress={() => setThemeColor(key, colorItem)}
                                style={[
                                    styles.colorCircleWrapper,
                                    isSelected && { borderColor: colors.primary },
                                ]}
                            >
                                <View style={[styles.colorCircle, { backgroundColor: colorItem }]} />
                            </Pressable>
                        );
                    })}
                </ScrollView>
            </View>
        );
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
            <Text style={[styles.title, { fontFamily: fontFamilyBold, color: colors.text }]}>
                Personalizar Colores
            </Text>
            <Text style={[styles.subtitle, { fontFamily: fontFamilyRegular, color: colors.textMuted }]}>
                Selecciona los colores para los diferentes elementos de la aplicación.
            </Text>

            {(Object.keys(COLOR_OPTIONS) as Array<keyof ThemeColors>).map(renderColorRow)}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 22,
        marginBottom: 6,
    },
    subtitle: {
        fontSize: 14,
        lineHeight: 20,
        marginBottom: 20,
    },
    rowContainer: {
        marginBottom: 24,
    },
    rowLabel: {
        fontSize: 16,
        marginBottom: 12,
    },
    scrollContent: {
        gap: 16,
        paddingRight: 20,
    },
    colorCircleWrapper: {
        width: 48,
        height: 48,
        borderRadius: 24,
        borderWidth: 2,
        borderColor: "transparent",
        alignItems: "center",
        justifyContent: "center",
    },
    colorCircle: {
        width: 36,
        height: 36,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.1)",
    },
});
