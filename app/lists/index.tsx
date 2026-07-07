import { Header, SearchInput, Typography } from "@components/index";
import { useAppTheme } from "@services";
import { useRouter } from "expo-router";
import { useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { usePlaylistsLocal } from "../../src/hooks/usePlaylistsLocal";
import { Playlist } from "../../src/models";

export default function PlaylistsPage() {
    const { theme } = useAppTheme();
    const router = useRouter();
    const { savedPlaylists, currentQueue, isLoading } = usePlaylistsLocal();
    const [search, setSearch] = useState("");

    const filteredPlaylists = savedPlaylists.filter(p => 
        p.name.toLowerCase().includes(search.toLowerCase())
    );

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = Math.floor(seconds % 60);
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    const renderPlaylistItem = ({ item }: { item: Playlist }) => {
        const lastSong = item.lastPlayedSongId 
            ? item.songs.find(s => s.id === item.lastPlayedSongId) 
            : null;

        return (
            <TouchableOpacity 
                style={[styles.playlistCard, { borderRadius: theme.shape.borderRadius, backgroundColor: theme.background.paper}]}
                onPress={() => router.push(`/lists/${item.id}`)}
            >
                <View style={styles.playlistInfo}>
                    <Typography variant="body" weight="bold">{item.name}</Typography>
                    <Typography variant="caption" color="secondary">
                        {item.songs.length} canciones • Última vez: {new Date(item.updatedAt).toLocaleDateString()}
                    </Typography>
                    {lastSong && item.lastPlayedTime !== undefined && (
                        <Typography variant="caption" color="secondary">
                            Último escuchado: {lastSong.title || `Canción ${lastSong.id}`} a las {formatTime(item.lastPlayedTime)}
                        </Typography>
                    )}
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <Header title="Listas de reproducción" hideBack />
            
            <View style={styles.content}>
                <SearchInput 
                    value={search}
                    onChangeText={setSearch}
                    placeholder="Buscar listas de reproducción..."
                />

                {!search && currentQueue && (
                    <View style={styles.section}>
                        <Typography variant="subtitle" weight="bold" style={styles.sectionTitle}>
                            Sin guardar
                        </Typography>
                        {renderPlaylistItem({ item: currentQueue })}
                    </View>
                )}

                <View style={styles.section}>
                    <Typography variant="subtitle" weight="bold" style={styles.sectionTitle}>
                        Tus Listas Guardadas
                    </Typography>
                    
                    {isLoading ? (
                        <Typography variant="body" color="secondary">Cargando...</Typography>
                    ) : filteredPlaylists.length === 0 ? (
                        <Typography variant="body" color="secondary">No se encontraron listas guardadas.</Typography>
                    ) : (
                        <FlatList
                            data={filteredPlaylists}
                            keyExtractor={(item) => item.id}
                            renderItem={renderPlaylistItem}
                            contentContainerStyle={styles.listContainer}
                        />
                    )}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        padding: 16,
        gap: 24,
    },
    section: {
        gap: 12,
    },
    sectionTitle: {
        marginBottom: 8,
    },
    listContainer: {
        gap: 12,
    },
    playlistCard: {
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },
    playlistInfo: {
        flex: 1,
        gap: 4,
    }
});
