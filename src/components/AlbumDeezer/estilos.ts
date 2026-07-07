import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    coverContainer: {
        width: "100%",
        aspectRatio: 1,
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
    albumArtist: {
        marginTop: 2,
    },
});
