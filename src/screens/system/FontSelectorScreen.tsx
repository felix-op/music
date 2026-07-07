import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { useAppFont, useAppTheme } from "@services";
import { Typography } from "@components";

export default function FontSelectorScreen() {
    const { selectedFont, changeFont, fontOptions } = useAppFont();
    const { theme } = useAppTheme();
    const colors = {
        text: theme.text.primary,
        textMuted: theme.text.secondary,
        surface: theme.background.paper,
        primary: theme.primary.main,
        secondary: theme.secondary.main,
        background: theme.background.default,
        border: theme.divider,
    };

    return (
        <View style={estilos.contenedor}>
            <Typography variant="h3" weight="bold" style={[estilos.seccionTitulo, { color: colors.text }]}>
                Personalizar Tipografía
            </Typography>
            <Typography variant="body" style={[estilos.seccionSubtitulo, { color: colors.textMuted }]}>
                Selecciona una fuente decorativa o clásica para las cabeceras y títulos del reproductor:
            </Typography>

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
                                    <Typography variant="bodyLarge" weight="bold" style={{ color: colors.text }}>
                                        {item.label}
                                    </Typography>
                                    {esActivo && <View style={[estilos.indicadorActivo, { backgroundColor: colors.secondary }]} />}
                                </View>
                            </View>

                            <View style={[estilos.contenedorMuestra, { backgroundColor: colors.background, borderColor: colors.border }]}>
                                <Typography variant="body" style={[estilos.textoMuestra, { fontFamily: previewFont, color: colors.text }]}>
                                    {item.sample}
                                </Typography>
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
        marginBottom: 6,
    },
    seccionSubtitulo: {
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
        textAlign: "center",
    },
});
