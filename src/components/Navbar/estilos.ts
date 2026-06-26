import { StyleSheet } from "react-native";

export const estilos = StyleSheet.create({
    contenedor: {
        height: 60,
        borderRadius: 16,
        borderWidth: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        paddingHorizontal: 10,
    },

    boton: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        position: "relative",
    },

    indicador: {
        position: "absolute",
        bottom: -6,
        width: 40,
        height: 6,
        borderBottomEndRadius: 10,
        borderBottomStartRadius: 10,
        // Android
        elevation: 8,

        // iOS
        shadowColor: "#00F2FE",
        shadowOpacity: 0.9,
        shadowRadius: 18,
        shadowOffset: {
            width: 0,
            height: 0,
        },
    },

    texto: {
        color: "#8b86a4", // Soft cosmic lavender for inactive text
        fontSize: 11,
        fontWeight: "600",
    },

    textoActivo: {
        color: "#00F2FE", // Active text is cosmic cyan
    },
});
