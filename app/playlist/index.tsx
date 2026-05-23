
import { NavbarButton, NavbarContainer } from "@components/index";
import { StyleSheet, Text, View } from "react-native";
import { Header } from "@components/index";

export default function Page() {

    return (
        <View>
            <Header title="Listas de Reproducción"/>
        </View>
    );
}


const estilos = StyleSheet.create({
    navbar: {
        width: 120,
        height: 60,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 8,
        paddingHorizontal: 10,
    }
});
