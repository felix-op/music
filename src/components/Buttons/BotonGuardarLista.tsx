import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { BotonSimple, BotonSimpleProps } from "./BotonSimple";
import { Typography } from "../Typography/Typography";

export function BotonGuardarLista({ ...props }: Omit<BotonSimpleProps, "children">) {
    return (
        <BotonSimple variant="surface" style={{ alignSelf: "flex-start" }} {...props}>
            <Ionicons name="bookmark-outline" size={20} color="#fff" />
            <Typography variant="body" weight="bold" color="white">
                Guardar Lista
            </Typography>
        </BotonSimple>
    );
}
