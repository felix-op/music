import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { BotonSimple, BotonSimpleProps } from "./BotonSimple";
import { Typography } from "../Typography/Typography";
import { useAppTheme } from "@services";

export function BotonEliminar({ ...props }: Omit<BotonSimpleProps, "children">) {
    const { theme } = useAppTheme();
    
    return (
        <BotonSimple variant="surface" style={{ alignSelf: "flex-start", backgroundColor: theme.error?.main + "22" }} {...props}>
            <Ionicons name="trash-outline" size={20} color={theme.error?.main || "#ff4444"} />
            <Typography variant="body" weight="bold" style={{ color: theme.error?.main || "#ff4444" }}>
                Eliminar
            </Typography>
        </BotonSimple>
    );
}
