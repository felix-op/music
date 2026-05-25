import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    coverContainer: {
        width: "100%",
        aspectRatio: 1,
        borderRadius: 10,
        backgroundColor: "#221b3a", // Cosmic dark placeholder color
        borderWidth: 1.5,
        borderColor: "#2e254d",
    },
    infoArea: {
        marginTop: 10,
        paddingHorizontal: 4,
    },
    titleLine: {
        height: 12,
        backgroundColor: "#221b3a",
        borderRadius: 6,
        width: "70%",
        marginBottom: 6,
    },
    artistLine: {
        height: 10,
        backgroundColor: "#221b3a",
        borderRadius: 5,
        width: "50%",
        marginBottom: 6,
    },
    metaRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 2,
    },
    metaLine: {
        height: 8,
        backgroundColor: "#221b3a",
        borderRadius: 4,
        width: "40%",
    },
});
