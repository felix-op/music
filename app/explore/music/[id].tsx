import { MenuModal } from "@components";
import { MenuOption } from "@components/MenuModal/MenuModal";
import { Ionicons } from "@expo/vector-icons";
import { useAppFont, useAppTheme } from "@services";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Image, Pressable, StyleSheet, View } from "react-native";
import { Typography } from "@components";
import { useGetMusicById } from "../../../src/hooks/useGetMusicById";

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

    const { data: music, isLoading } = useGetMusicById(Number(id));
    const [isOptionsModalVisible, setOptionsModalVisible] = useState(false);

    const handlePlay = () => {
        // Lógica de reproducción
        console.log("Reproduciendo:", music?.title);
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
                <Typography variant="body">
                    Música no encontrada.
                </Typography>
            ) : (
                <View style={styles.content}>
                    {/* Imagen del Album */}
                    <View style={styles.imageContainer}>
                        {music.album?.cover_xl ? (
                            <Image source={{ uri: music.album?.cover_xl }} style={styles.coverImage} />
                        ) : (
                            <View style={[styles.coverPlaceholder, { backgroundColor: theme.background.paper }]}>
                                <Ionicons name="musical-notes" size={80} color={theme.text.disabled} />
                            </View>
                        )}
                    </View>

                    {/* Metadatos Principales */}
                    <View style={styles.metadataContainer}>
                        <Typography variant="h3" weight="bold" style={styles.title}>
                            {music.title}
                        </Typography>
                        <Typography variant="bodyLarge" color="secondary" style={styles.subtitle}>
                            {music.artist?.name} • {music.album?.title}
                        </Typography>
                        <Typography variant="body" color="disabled" style={styles.tertiaryText}>
                            {formatDuration(music.duration)}
                        </Typography>
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
        textAlign: "center",
        marginBottom: 8,
    },
    subtitle: {
        textAlign: "center",
        marginBottom: 4,
    },
    tertiaryText: {
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