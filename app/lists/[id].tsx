import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { View, FlatList, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Header, Typography, FormModal, InputText, BotonGuardarLista, BotonContinuar, BotonIconoRecargar, BotonEliminar, BotonRenombrar } from "@components/index";
import { usePlaylistsLocal } from "../../src/hooks/usePlaylistsLocal";
import { usePlaylistMutations } from "../../src/hooks/usePlaylistMutations";
import usePlayList from "../../src/hooks/usePlayList";
import { Playlist, PlaylistSong } from "../../src/models";
import { Ionicons } from "@expo/vector-icons";

export default function PlaylistDetailPage() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const { savedPlaylists, currentQueue } = usePlaylistsLocal();
    const { updateProgress, savePlaylist, deletePlaylist, replaceCurrentQueue } = usePlaylistMutations();
    const { playFromQueue } = usePlayList();
    
    const [isSaveModalVisible, setIsSaveModalVisible] = useState(false);
    const [playlistName, setPlaylistName] = useState("");
    const [nameError, setNameError] = useState("");

    // Buscar si es la cola actual o una guardada
    let playlist: Playlist | undefined = currentQueue?.id === id ? currentQueue : savedPlaylists.find(p => p.id === id);

    if (!playlist) {
        return (
            <View style={styles.container}>
                <Header title="No encontrada" />
                <View style={styles.content}>
                    <Typography variant="body" color="secondary">La lista no existe.</Typography>
                </View>
            </View>
        );
    }

    const totalDurationInSeconds = playlist.songs.reduce((acc, song) => acc + (song.duration || 0), 0);
    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = Math.floor(seconds % 60);
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    const handlePlaySong = async (song: PlaylistSong, index: number) => {
        await replaceCurrentQueue.mutateAsync(playlist!);
        playFromQueue(song.id);
    };

    const handleContinue = async () => {
        await replaceCurrentQueue.mutateAsync(playlist!);
        playFromQueue(playlist?.lastPlayedSongId);
    };

    const handleReset = async () => {
        if (playlist?.songs.length) {
            await replaceCurrentQueue.mutateAsync(playlist!);
            playFromQueue(playlist.songs[0].id);
        }
    };

    const handleSavePermanent = () => {
        const nameToSave = playlistName.trim();
        if (!nameToSave) {
            setNameError("Debes ingresar un nombre para la lista");
            return;
        }

        savePlaylist.mutate({ ...playlist!, name: nameToSave });
        Alert.alert("Guardada", `La lista "${nameToSave}" se ha guardado permanentemente.`);
        setIsSaveModalVisible(false);
        // Si no era permanente, volver. Si ya era permanente (renombrar), quedarse.
        if (!playlist!.isPermanent) {
            router.back();
        }
    };

    const handleDelete = () => {
        Alert.alert(
            "Eliminar Lista",
            `¿Estás seguro que deseas eliminar "${playlist!.name}"?`,
            [
                { text: "Cancelar", style: "cancel" },
                { 
                    text: "Eliminar", 
                    style: "destructive",
                    onPress: () => {
                        deletePlaylist.mutate(playlist!.id);
                        router.back();
                    }
                }
            ]
        );
    };

    const renderSong = ({ item, index }: { item: PlaylistSong, index: number }) => (
        <TouchableOpacity style={styles.songCard} onPress={() => handlePlaySong(item, index)}>
            <View style={styles.songNumber}>
                <Typography variant="body" color="secondary">{index + 1}</Typography>
            </View>
            <View style={styles.songInfo}>
                <Typography variant="body" weight="bold">{item.title || `Canción ${item.id}`}</Typography>
                <Typography variant="caption" color="secondary">{item.artist || 'Artista Desconocido'}</Typography>
            </View>
            <Typography variant="caption" color="secondary">{formatTime(item.duration || 210)}</Typography>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Header title={playlist.name} />
            
            <View style={styles.headerInfo}>
                <Typography variant="body" color="secondary">
                    {playlist.songs.length} canciones • {formatTime(totalDurationInSeconds)} en total
                </Typography>
                {!playlist.isPermanent ? (
                    <BotonGuardarLista onPress={() => {
                        setPlaylistName(playlist!.name === "Cola Actual" || playlist!.name === "Sin nombre" ? "" : playlist!.name);
                        setNameError("");
                        setIsSaveModalVisible(true);
                    }} />
                ) : (
                    <View style={{ flexDirection: 'row', gap: 12 }}>
                        <BotonRenombrar onPress={() => {
                            setPlaylistName(playlist!.name);
                            setNameError("");
                            setIsSaveModalVisible(true);
                        }} />
                        <BotonEliminar onPress={handleDelete} />
                    </View>
                )}

                <View style={styles.actionButtons}>
                    <BotonContinuar onPress={handleContinue} />
                    <BotonIconoRecargar onPress={handleReset} />
                </View>
            </View>

            <FlatList
                data={playlist.songs}
                keyExtractor={(item, idx) => `${item.id}-${idx}`}
                renderItem={renderSong}
                contentContainerStyle={styles.listContainer}
            />

            <FormModal
                visible={isSaveModalVisible}
                onClose={() => setIsSaveModalVisible(false)}
                onSave={handleSavePermanent}
                title="Guardar Lista de Reproducción"
            >
                <InputText
                    label="Nombre"
                    value={playlistName}
                    onChangeText={(text) => {
                        setPlaylistName(text);
                        if (nameError) setNameError("");
                    }}
                    placeholder="Ej. Mi Playlist Favorita"
                    error={nameError}
                    variant={nameError ? "error" : "normal"}
                />
            </FormModal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        padding: 16,
    },
    headerInfo: {
        padding: 16,
        gap: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#2C2C2E',
    },
    actionButtons: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 8,
    },
    listContainer: {
        padding: 16,
        gap: 16,
    },
    songCard: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    songNumber: {
        width: 24,
        alignItems: 'center',
    },
    songInfo: {
        flex: 1,
        gap: 4,
    }
});
