import React from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { useAppFont } from "@services";
import { styles } from "./estilos";

type TProps = {
    message?: string;
};

export function SimpleLoading({ message = "Conectando con el cosmos..." }: TProps) {
    const { fontFamilyRegular } = useAppFont();

    return (
        <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#8B5CF6" />
            <Text style={[styles.loaderText, { fontFamily: fontFamilyRegular }]}>
                {message}
            </Text>
        </View>
    );
}
