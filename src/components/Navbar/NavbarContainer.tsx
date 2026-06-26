import { useAppTheme } from "@services";
import { ReactNode } from "react";
import { View } from "react-native";
import { estilos } from "./estilos";

type Props = {
    children: ReactNode
};

export function NavbarContainer({ children }: Props) {
    const { theme } = useAppTheme();

    return (
        <View
            style={[
                estilos.contenedor,
                {
                    backgroundColor: theme.background.paper,
                    borderColor: theme.divider,
                },
            ]}
        >
            {children}
        </View>
    );
}