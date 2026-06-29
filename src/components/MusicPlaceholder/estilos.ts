import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: 2,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: "#221b3a",
    },
    circle: {
        width: 52,
        height: 52,
        borderRadius: 26,
        backgroundColor: "#221b3a",
    },
    infoCol: {
        flex: 1,
        marginLeft: 14,
        gap: 6,
    },
    titleLine: {
        height: 13,
        borderRadius: 6,
        width: "65%",
        backgroundColor: "#221b3a",
    },
    subtitleLine: {
        height: 11,
        borderRadius: 5,
        width: "40%",
        backgroundColor: "#221b3a",
    },
    durationLine: {
        height: 11,
        borderRadius: 5,
        width: 32,
        backgroundColor: "#221b3a",
        marginLeft: 12,
    },
});
