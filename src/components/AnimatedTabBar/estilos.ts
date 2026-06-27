import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    chipRow: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#151124",
        borderRadius: 24,
        padding: 4,
        marginTop: 10,
        marginBottom: 20,
        position: "relative",
        borderWidth: 1.5,
        borderColor: "#221b3a",
    },
    activeCapsule: {
        position: "absolute",
        top: 4,
        bottom: 4,
        left: 4,
        backgroundColor: "#8B5CF6",
        borderRadius: 20,
        shadowColor: "#8B5CF6",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
        elevation: 4,
    },
    tabButton: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 10,
        zIndex: 1,
    },
    tabText: {
        fontSize: 14,
    },
    tabTextActive: {
        color: "#ffffff",
    },
    tabTextInactive: {
        color: "#a6a0c5",
    },
});