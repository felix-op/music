import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { BotonSimple, BotonSimpleProps } from "./BotonSimple";
import { useAppTheme } from "@services";

export function BotonIconoContinuar({ ...props }: Omit<BotonSimpleProps, "children">) {
    const { theme } = useAppTheme();
    
    return (
        <BotonSimple variant="primary" style={{ width: 48, paddingHorizontal: 0 }} {...props}>
            <Ionicons name="play" size={24} color={theme.primary.contrastText || "#000"} />
        </BotonSimple>
    );
}
