import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "flex-start",
    },
    avatarContainer: {
        borderRadius: 999,
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        position: "relative",
        borderWidth: 2,
        borderColor: "rgba(255, 255, 255, 0.1)",
    },
    avatarImage: {
        width: "100%",
        height: "100%",
    },
    avatarFallback: {
        ...StyleSheet.absoluteFillObject,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(139, 92, 246, 0.15)",
    },
    glossyOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(255, 255, 255, 0.05)",
    },
    infoArea: {
        marginTop: 10,
        alignItems: "center",
        width: "100%",
        paddingHorizontal: 4,
    },
    artistName: {
        textAlign: "center",
    },
    shimmerContainer: {
        ...StyleSheet.absoluteFillObject,
        overflow: "hidden",
        backgroundColor: "rgba(255,255,255,0.03)",
    },
    placeholderText: {
        height: 12,
        borderRadius: 4,
        marginTop: 12,
        backgroundColor: "rgba(255,255,255,0.04)",
    },
});
