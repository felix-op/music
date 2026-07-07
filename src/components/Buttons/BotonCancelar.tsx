import React from "react";
import { BotonSimple, BotonSimpleProps } from "./BotonSimple";
import { Typography } from "../Typography/Typography";
import { StyleProp, ViewStyle } from "react-native";

interface BotonCancelarProps extends Omit<BotonSimpleProps, "children"> {
    label?: string;
    style?: StyleProp<ViewStyle>;
}

export function BotonCancelar({ label = "Cancelar", style, ...props }: BotonCancelarProps) {
    return (
        <BotonSimple
            variant="transparent"
            style={style}
            {...props}
        >
            <Typography variant="body" color="secondary" weight="bold">
                {label}
            </Typography>
        </BotonSimple>
    );
}
