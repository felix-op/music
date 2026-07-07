import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    card: {
        backgroundColor: "#151124",
        borderRadius: 14,
        padding: 8,
        borderWidth: 1.5,
        borderColor: "#221b3a",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    coverContainer: {
        width: "100%",
        aspectRatio: 1,
        borderRadius: 10,
        overflow: "hidden",
        backgroundColor: "#1e1535",
        position: "relative",
    },
    coverImage: {
        width: "100%",
        height: "100%",
    },
    coverFallback: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#2a1f4a",
    },
    glossyOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(255, 255, 255, 0.04)",
    },
    infoArea: {
        marginTop: 10,
        paddingHorizontal: 4,
    },
    albumTitle: {
        fontSize: 14,
        color: "#ffffff",
    },
    albumArtist: {
        fontSize: 12,
        color: "#a6a0c5",
        marginTop: 2,
    },
});
