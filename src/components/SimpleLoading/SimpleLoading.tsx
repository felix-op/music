import React from "react";
import { ActivityIndicator, View } from "react-native";
import { Typography } from "@components";
import { styles } from "./estilos";

type TProps = {
    message?: string;
};

export function SimpleLoading({ message = "Conectando con el cosmos..." }: TProps) {

    return (
        <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#8B5CF6" />
            <Typography variant="body" color="secondary" style={styles.loaderText}>
                {message}
            </Typography>
        </View>
    );
}
