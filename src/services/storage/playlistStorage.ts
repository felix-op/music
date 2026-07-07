import AsyncStorage from '@react-native-async-storage/async-storage';
import { Playlist } from '../../models';

const PLAYLISTS_KEY = '@music_app_playlists';
const CURRENT_QUEUE_KEY = '@music_app_current_queue';

export const playlistStorage = {
    /**
     * Obtiene todas las playlists guardadas permanentemente
     */
    getSavedPlaylists: async (): Promise<Playlist[]> => {
        try {
            const data = await AsyncStorage.getItem(PLAYLISTS_KEY);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error('Error al obtener playlists guardadas:', error);
            return [];
        }
    },

    /**
     * Guarda la lista de playlists permanente completa
     */
    setSavedPlaylists: async (playlists: Playlist[]): Promise<void> => {
        try {
            await AsyncStorage.setItem(PLAYLISTS_KEY, JSON.stringify(playlists));
        } catch (error) {
            console.error('Error al guardar playlists:', error);
        }
    },

    /**
     * Guarda una nueva playlist permanente
     */
    savePlaylist: async (playlist: Playlist): Promise<void> => {
        const playlists = await playlistStorage.getSavedPlaylists();
        const existingIndex = playlists.findIndex(p => p.id === playlist.id);
        
        const playlistToSave = { ...playlist, isPermanent: true };

        if (existingIndex >= 0) {
            playlists[existingIndex] = playlistToSave;
        } else {
            playlists.unshift(playlistToSave); // Ponerla al principio
        }
        await playlistStorage.setSavedPlaylists(playlists);
    },

    /**
     * Elimina una playlist guardada
     */
    deletePlaylist: async (id: string): Promise<void> => {
        const playlists = await playlistStorage.getSavedPlaylists();
        const filtered = playlists.filter(p => p.id !== id);
        await playlistStorage.setSavedPlaylists(filtered);
    },

    /**
     * Obtiene la cola actual (sesión temporal)
     */
    getCurrentQueue: async (): Promise<Playlist | null> => {
        try {
            const data = await AsyncStorage.getItem(CURRENT_QUEUE_KEY);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('Error al obtener la cola actual:', error);
            return null;
        }
    },

    /**
     * Guarda o actualiza la cola actual
     */
    setCurrentQueue: async (playlist: Playlist | null): Promise<void> => {
        try {
            if (!playlist) {
                await AsyncStorage.removeItem(CURRENT_QUEUE_KEY);
                return;
            }
            await AsyncStorage.setItem(CURRENT_QUEUE_KEY, JSON.stringify(playlist));
        } catch (error) {
            console.error('Error al guardar la cola actual:', error);
        }
    },
};
