import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    card: {
        backgroundColor: "#151124", // Cosmic dark purple card
        borderRadius: 14,
        padding: 8,
        borderWidth: 1.5,
        borderColor: "#221b3a", // Subtle dark cosmic border
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
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
    },
    discIcon: {
        opacity: 0.85,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
    },
    glossyOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(255, 255, 255, 0.05)",
    },
    infoArea: {
        marginTop: 10,
        paddingHorizontal: 4,
    },
    albumTitle: {
    },
    albumArtist: {
        marginTop: 2,
    },
    metaRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 6,
    },
    metaText: {
        fontSize: 10,
        color: "#8b86a4", // Muted cosmic lavender
    },
    metaDot: {
        fontSize: 10,
        color: "#8b86a4",
        marginHorizontal: 4,
    },
});
