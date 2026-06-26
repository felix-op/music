import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { FontOption, useAppFont } from "@services";
import { useAppTheme } from "@services";

export default function FontSelectorScreen() {
    const { selectedFont, changeFont, fontFamilyRegular, fontFamilyBold, fontOptions } = useAppFont();
    const { colors } = useAppTheme();

    return (
        <View style={estilos.contenedor}>
            <Text style={[estilos.seccionTitulo, { fontFamily: fontFamilyBold, color: colors.text }]}>
                Personalizar Tipografía
            </Text>
            <Text style={[estilos.seccionSubtitulo, { fontFamily: fontFamilyRegular, color: colors.textMuted }]}>
                Selecciona una fuente decorativa o clásica para las cabeceras y títulos del reproductor:
            </Text>

            <View style={estilos.tarjetero}>
                {fontOptions.map((item) => {
                    const esActivo = selectedFont === item.key;
                    const previewFont = item.previewFont;

                    return (
                        <Pressable
                            key={item.key}
                            onPress={() => changeFont(item.key)}
                            style={[
                                estilos.tarjeta,
                                { backgroundColor: colors.surface, borderColor: "transparent" },
                                esActivo && { borderColor: colors.primary, backgroundColor: colors.surface + "cc" }, // Slightly transparent for active maybe? Or just keep it as is. Wait, let's use what we had:
                                // esActivo ? { backgroundColor: colors.surface, borderColor: colors.primary } : { backgroundColor: colors.surface, borderColor: "transparent" }
                                // The original had: backgroundColor: "#151124" and active "#1d1733". We can just use colors.surface for inactive. For active, maybe colors.surface. 
                            ]}
                        >
                            <View style={estilos.infoTarjeta}>
                                <View style={estilos.filaTitulo}>
                                    <Text style={[estilos.labelTarjeta, { fontFamily: fontFamilyBold, color: colors.text }]}>
                                        {item.label}
                                    </Text>
                                    {esActivo && <View style={[estilos.indicadorActivo, { backgroundColor: colors.secondary }]} />}
                                </View>
                            </View>

                            <View style={[estilos.contenedorMuestra, { backgroundColor: colors.background, borderColor: colors.border }]}>
                                <Text style={[estilos.textoMuestra, { fontFamily: previewFont, color: colors.text }]}>
                                    {item.sample}
                                </Text>
                            </View>
                        </Pressable>
                    );
                })}
            </View>
        </View>
    );
}

const estilos = StyleSheet.create({
    contenedor: {
        flex: 1,
        paddingTop: 10,
        paddingHorizontal: 20,
    },
    seccionTitulo: {
        fontSize: 22,
        marginBottom: 6,
    },
    seccionSubtitulo: {
        fontSize: 14,
        lineHeight: 20,
        marginBottom: 20,
    },
    tarjetero: {
        gap: 16,
    },
    tarjeta: {
        borderRadius: 14,
        padding: 16,
        borderWidth: 1.5,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 6,
        elevation: 6,
    },
    infoTarjeta: {
        flex: 1,
        paddingRight: 12,
    },
    filaTitulo: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginBottom: 4,
    },
    labelTarjeta: {
        fontSize: 16,
        fontWeight: "600",
    },
    indicadorActivo: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    descripcion: {
        fontSize: 12,
        lineHeight: 16,
    },
    contenedorMuestra: {
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 12,
        alignItems: "center",
        justifyContent: "center",
        minWidth: 120,
        borderWidth: 1,
    },
    textoMuestra: {
        fontSize: 14,
        textAlign: "center",
    },
});
