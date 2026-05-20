import { StyleSheet, Text } from "react-native";

type TProps = {
    children: string
    tipo?: "titulo" | "cuerpo"
};

export function Typography(props: TProps) {

    return (
        <Text style={styles[props.tipo ?? "default"]}>
            {props.children}
        </Text>
    );
}

const styles = StyleSheet.create({
    titulo: {
        color: "black",
        fontSize: 30,
    },
    cuerpo: {
        color: "gray",
        fontSize: 20,
    },
    default: {
        color: "black",
        fontSize: 16,
    }
});
