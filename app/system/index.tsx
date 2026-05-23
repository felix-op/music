import { Stack } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { FontOption, useAppFont } from "../../src/context/FontContext";

export default function SystemSettingsPage() {
    const { selectedFont, changeFont, fontFamilyRegular, fontFamilyBold } = useAppFont();

    const fontOptions: { key: FontOption; label: string; sample: string }[] = [
        {
            key: "Caveat",
            label: "Caveat",
            sample: "Música & Sentimiento",
        },
        {
            key: "Poppins",
            label: "Poppins",
            sample: "Modern Style",
        },
        {
            key: "SourceCodePro",
            label: "Source Code Pro",
            sample: "const music = true;",
        },
        {
            key: "Finlandica",
            label: "Finlandica",
            sample: "Nordic Design",
        },
    ];

    return (
        <View style={estilos.contenedor}>
            <Stack.Screen
                options={{
                    headerShown: true,
                    title: "Configuración",
                }}
            />

            <Text style={[estilos.seccionTitulo, { fontFamily: fontFamilyBold }]}>
                Personalizar Tipografía
            </Text>
            <Text style={[estilos.seccionSubtitulo, { fontFamily: fontFamilyRegular }]}>
                Selecciona una fuente decorativa o clásica para las cabeceras y títulos del reproductor:
            </Text>

            <View style={estilos.tarjetero}>
                {fontOptions.map((item) => {
                    const esActivo = selectedFont === item.key;
                    // Mapeo dinámico para el texto de muestra en la tarjeta
                    let previewFont = "Poppins-Regular";
                    if (item.key === "Caveat") previewFont = "Caveat-Bold";
                    else if (item.key === "Poppins") previewFont = "Poppins-Bold";
                    else if (item.key === "SourceCodePro") previewFont = "SourceCodePro-Bold";
                    else if (item.key === "Finlandica") previewFont = "Finlandica-Bold";

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
                                    <Text style={[estilos.labelTarjeta, { fontFamily: fontFamilyBold }]}>
                                        {item.label}
                                    </Text>
                                    {esActivo && <View style={estilos.indicadorActivo} />}
                                </View>
                            </View>

                            <View style={estilos.contenedorMuestra}>
                                <Text style={[estilos.textoMuestra, { fontFamily: previewFont }]}>
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
    },
    seccionTitulo: {
        fontSize: 22,
        color: "#ffffff",
        marginBottom: 6,
    },
    seccionSubtitulo: {
        fontSize: 14,
        color: "#a6a0c5", // Soft cosmic lavender
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
        fontSize: 16,
        color: "#ffffff",
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
        fontSize: 14,
        color: "#ffffff",
        textAlign: "center",
    },
});
