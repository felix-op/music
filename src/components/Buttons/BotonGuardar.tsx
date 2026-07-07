import React from "react";
import { useAppTheme } from "@services";
import { BotonSimple, BotonSimpleProps } from "./BotonSimple";
import { Typography } from "../Typography/Typography";
import { StyleProp, ViewStyle } from "react-native";

interface BotonGuardarProps extends Omit<BotonSimpleProps, "children"> {
    label?: string;
    style?: StyleProp<ViewStyle>;
}

export function BotonGuardar({ label = "Guardar", style, ...props }: BotonGuardarProps) {
    const { theme } = useAppTheme();

    return (
        <BotonSimple
            variant="primary"
            style={[
                { minWidth: 100 },
                style,
            ]}
            {...props}
        >
            <Typography variant="body" color="black" weight="bold">
                {label}
            </Typography>
        </BotonSimple>
    );
}
