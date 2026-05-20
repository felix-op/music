
import { NavbarButton, NavbarContainer } from "@components/index";
import { StyleSheet, Text, View } from "react-native";

export default function Page() {

    return (
        <View>
            <View style={estilos.header}>
                <Text style={{ fontSize: 28, fontWeight: "bold", color: "#eee"}}>Playlist</Text>
                <View style={estilos.navbar}>
                    <NavbarContainer>
                        <NavbarButton pathname="playlist" route={{ href: "playlist", id: "", label: "", icon: "play" }} />
                        <NavbarButton pathname="explore" route={{ href: "/", id: "", label: "", icon: "list" }} />
                    </NavbarContainer>
                </View>
            </View>

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