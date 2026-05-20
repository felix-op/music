import { StyleSheet } from "react-native";

export const estilos = StyleSheet.create({
    contenedor: {
        height: 60,
        backgroundColor: "#222",
        borderRadius: 16,
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
        bottom: 12,
        width: 16,
        height: 3,
        borderRadius: 2,
        backgroundColor: "#fff",
    },

    texto: {
        color: "#888",
        fontSize: 11,
        fontWeight: "600",
    },

    textoActivo: {
        color: "#2b2",
    },
});
