import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { BotonSimple, BotonSimpleProps } from "./BotonSimple";
import { useAppTheme } from "@services";

export function BotonIconoRecargar({ ...props }: Omit<BotonSimpleProps, "children">) {
    const { theme } = useAppTheme();
    
    return (
        <BotonSimple variant="surface" style={{ width: 48, paddingHorizontal: 0 }} {...props}>
            <Ionicons name="refresh" size={24} color={theme.text.primary} />
        </BotonSimple>
    );
}
