import { MenuModal } from "@components";
import { MenuOption } from "@components/MenuModal/MenuModal";
import { Ionicons } from "@expo/vector-icons";
import { Music } from "@models/music";
import { MusicsApi, useAppFont, useAppTheme } from "@services";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, Pressable, StyleSheet, Text, View } from "react-native";

type Params = {
    id: string;
    musicName?: string;
};

// Función auxiliar para formatear segundos a mm:ss
const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
};

export default function MusicDetailPage() {
    const { id, musicName } = useLocalSearchParams<Params>();
    const { theme } = useAppTheme();
    const { fontFamilyRegular, fontFamilyBold } = useAppFont(); // Asumiendo que tienes fontFamilyBold

    const [music, setMusic] = useState<Music | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isOptionsModalVisible, setOptionsModalVisible] = useState(false);

    useEffect(() => {
        const fetchMusic = async () => {
            try {
                const data = await MusicsApi.getById(Number(id));
                if (data) setMusic(data);
            } catch (error) {
                console.error("Error fetching music:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchMusic();
    }, [id]);

    const handlePlay = () => {
        // Lógica de reproducción
        console.log("Reproduciendo:", music?.name);
    };

    const modalOptions: MenuOption[] = [
        {
            icon: "add-circle-outline",
            label: "Agregar a la cola",
            onPress: () => console.log(`Agregando ${music?.id} a la cola`),
        },
        {
            icon: "albums-outline",
            label: "Ir al álbum",
            onPress: () => console.log("Navegando al álbum"),
        },
        {
            icon: "person-outline",
            label: "Ir al artista",
            onPress: () => console.log("Navegando al artista"),
        },
        {
            icon: "download-outline",
            label: "Descargar",
            onPress: () => console.log("Iniciando descarga"),
        },
    ];

    return (
        <View style={[styles.container, { backgroundColor: theme.background.default }]}>
            <Stack.Screen
                options={{
                    headerShown: true,
                    title: musicName ?? "Detalle",
                    animation: "slide_from_right",
                    headerBackVisible: false,
                    headerLeft: () => (
                        <Pressable
                            onPress={() => router.back()}
                            style={({ pressed }) => [
                                styles.backButton,
                                pressed && { opacity: 0.5 },
                            ]}
                        >
                            <Ionicons name="chevron-back" size={26} color={theme.text.primary} />
                        </Pressable>
                    ),
                }}
            />

            {isLoading ? (
                <ActivityIndicator size="large" color={theme.primary.main} />
            ) : !music ? (
                <Text style={{ color: theme.text.primary, fontFamily: fontFamilyRegular }}>
                    Música no encontrada.
                </Text>
            ) : (
                <View style={styles.content}>
                    {/* Imagen del Album */}
                    <View style={styles.imageContainer}>
                        {music.album?.image ? (
                            <Image source={{ uri: music.album?.image }} style={styles.coverImage} />
                        ) : (
                            <View style={[styles.coverPlaceholder, { backgroundColor: theme.background.paper }]}>
                                <Ionicons name="musical-notes" size={80} color={theme.text.disabled} />
                            </View>
                        )}
                    </View>

                    {/* Metadatos Principales */}
                    <View style={styles.metadataContainer}>
                        <Text style={[styles.title, { color: theme.text.primary, fontFamily: fontFamilyBold }]}>
                            {music.name}
                        </Text>
                        <Text style={[styles.subtitle, { color: theme.text.secondary, fontFamily: fontFamilyRegular }]}>
                            {music.artist?.name} • {music.album?.name}
                        </Text>
                        <Text style={[styles.tertiaryText, { color: theme.text.disabled, fontFamily: fontFamilyRegular }]}>
                            {music.genres?.map(g => g.name).join(", ")} • {music.duration}
                        </Text>
                    </View>

                    {/* Controles */}
                    <View style={styles.controlsContainer}>
                        <Pressable style={styles.iconButton}>
                            <Ionicons name="heart-outline" size={28} color={theme.text.primary} />
                        </Pressable>

                        <Pressable
                            onPress={handlePlay}
                            style={({ pressed }) => [
                                styles.playButton,
                                { backgroundColor: theme.primary.main },
                                pressed && { opacity: 0.8 }
                            ]}
                        >
                            <Ionicons name="play" size={32} color={theme.background.default} />
                        </Pressable>

                        <Pressable onPress={() => setOptionsModalVisible(true)} style={styles.iconButton}>
                            <Ionicons name="ellipsis-vertical" size={28} color={theme.text.primary} />
                        </Pressable>
                    </View>
                </View>
            )}

            {/* Modal de Opciones */}
            <MenuModal
                visible={isOptionsModalVisible} 
                onClose={() => setOptionsModalVisible(false)}
                title="Opciones"
                options={modalOptions}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        padding: 24,
        alignItems: "center",
    },
    backButton: {
        paddingRight: 8,
    },
    imageContainer: {
        width: 250,
        height: 250,
        borderRadius: 12,
        overflow: "hidden",
        marginBottom: 32,
        marginTop: 16,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    coverImage: {
        width: "100%",
        height: "100%",
    },
    coverPlaceholder: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    metadataContainer: {
        alignItems: "center",
        marginBottom: 40,
        width: "100%",
    },
    title: {
        fontSize: 24,
        textAlign: "center",
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        textAlign: "center",
        marginBottom: 4,
    },
    tertiaryText: {
        fontSize: 14,
        textAlign: "center",
    },
    controlsContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "80%",
    },
    iconButton: {
        padding: 12,
    },
    playButton: {
        width: 72,
        height: 72,
        borderRadius: 36,
        alignItems: "center",
        justifyContent: "center",
    },
});