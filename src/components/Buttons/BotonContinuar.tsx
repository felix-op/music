import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { BotonSimple, BotonSimpleProps } from "./BotonSimple";
import { Typography } from "../Typography/Typography";
import { useAppTheme } from "@services";

export function BotonContinuar({ ...props }: Omit<BotonSimpleProps, "children">) {
    const { theme } = useAppTheme();
    
    return (
        <BotonSimple variant="primary" style={{ flex: 1 }} {...props}>
            <Ionicons name="play" size={24} color={theme.primary.contrastText || "#000"} />
            <Typography variant="body" weight="bold" style={{ color: theme.primary.contrastText || "#000" }}>
                Continuar
            </Typography>
        </BotonSimple>
    );
}
