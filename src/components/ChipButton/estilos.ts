import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    button: {
        borderRadius: 24,
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderWidth: 1.5,
        alignItems: "center",
        justifyContent: "center",
        minWidth: 80,
        flex: 1, // Allow flexible distribution in the row
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 4,
    },
    buttonInactive: {
        backgroundColor: "#151124", // Cosmic dark purple card
        borderColor: "#221b3a", // Subtle dark cosmic border
    },
    buttonActive: {
        backgroundColor: "#1d1733", // Lighter active cosmic background from settings
        borderColor: "#8B5CF6", // Electric neon violet border for active item
    },
    text: {
        fontSize: 13,
        fontWeight: "600",
        textAlign: "center",
    },
    textInactive: {
        color: "#8b86a4", // Soft cosmic lavender
    },
    textActive: {
        color: "#ffffff", // Pure white for high contrast
    },
});
