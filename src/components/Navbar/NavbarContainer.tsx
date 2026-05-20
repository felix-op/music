import { ReactNode } from "react";
import { View } from "react-native";
import { estilos } from "./estilos";

type Props = {
    children: ReactNode
};

export function NavbarContainer({ children }: Props) {
    return (
        <View style={estilos.contenedor}>
            {children}
        </View>
    );
}