import { Stack } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";
import { useAppFont } from "@services";
import { Typography } from "@components";

export default function SystemSettingsPage() {
    const { selectedFont, changeFont, fontOptions } = useAppFont();

    return (
        <View style={estilos.contenedor}>
            <Stack.Screen
                options={{
                    headerShown: true,
                    title: "Configuración",
                }}
            />

            <Typography variant="h3" weight="bold" style={estilos.seccionTitulo}>
                Personalizar Tipografía
            </Typography>
            <Typography variant="body" color="secondary" style={estilos.seccionSubtitulo}>
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
                                esActivo && estilos.tarjetaActiva,
                            ]}
                        >
                            <View style={estilos.infoTarjeta}>
                                <View style={estilos.filaTitulo}>
                                    <Typography variant="bodyLarge" weight="bold" style={estilos.labelTarjeta}>
                                        {item.label}
                                    </Typography>
                                    {esActivo && <View style={estilos.indicadorActivo} />}
                                </View>
                            </View>

                            <View style={estilos.contenedorMuestra}>
                                <Typography variant="body" style={[estilos.textoMuestra, { fontFamily: previewFont }]}>
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
        backgroundColor: "#151124", // Cosmic dark purple card
        borderRadius: 14,
        padding: 16,
        borderWidth: 1.5,
        borderColor: "transparent",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 6,
        elevation: 6,
    },
    tarjetaActiva: {
        borderColor: "#8B5CF6", // Electric neon violet border for active item
        backgroundColor: "#1d1733", // Slightly lighter active cosmic background
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
        backgroundColor: "#00F2FE", // Glowing cosmic cyan active dot
    },
    descripcion: {
        fontSize: 12,
        color: "#8b86a4", // Soft muted cosmic lavender description text
        lineHeight: 16,
    },
    contenedorMuestra: {
        backgroundColor: "#09070F", // Seamless deep space black inside samples
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 12,
        alignItems: "center",
        justifyContent: "center",
        minWidth: 120,
        borderWidth: 1,
        borderColor: "#221b3a", // Cosmic dark purple border
    },
    textoMuestra: {
        textAlign: "center",
    },
});
