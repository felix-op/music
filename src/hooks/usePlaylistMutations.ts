import { useMutation, useQueryClient } from '@tanstack/react-query';
import { playlistStorage } from '../services/storage/playlistStorage';
import { Playlist, PlaylistSong } from '../models';

export const usePlaylistMutations = () => {
    const queryClient = useQueryClient();

    // Invalida las queries para refrescar la UI
    const invalidatePlaylists = () => {
        queryClient.invalidateQueries({ queryKey: ['savedPlaylists'] });
        queryClient.invalidateQueries({ queryKey: ['currentQueue'] });
    };

    // Añade una canción a la cola actual. Si no existe, la crea.
    const addToCurrentQueue = useMutation({
        mutationFn: async (song: PlaylistSong) => {
            let queue = await playlistStorage.getCurrentQueue();
            if (!queue) {
                queue = {
                    id: Date.now().toString(),
                    name: song.title || 'Sin nombre',
                    createdAt: Date.now(),
                    updatedAt: Date.now(),
                    isPermanent: false,
                    songs: [],
                };
            }
            queue.songs.push(song);
            queue.updatedAt = Date.now();
            await playlistStorage.setCurrentQueue(queue);
            return queue;
        },
        onSuccess: () => invalidatePlaylists(),
    });

    // Sobrescribe la cola actual con una nueva canción (al reproducir una nueva sin añadir a la cola existente)
    const playNewSong = useMutation({
        mutationFn: async (song: PlaylistSong) => {
            const queue: Playlist = {
                id: Date.now().toString(),
                name: song.title || 'Sin nombre',
                createdAt: Date.now(),
                updatedAt: Date.now(),
                isPermanent: false,
                songs: [song],
            };
            await playlistStorage.setCurrentQueue(queue);
            return queue;
        },
        onSuccess: () => invalidatePlaylists(),
    });

    // Reemplaza la cola actual con una lista de reproducción entera
    const replaceCurrentQueue = useMutation({
        mutationFn: async (playlist: Playlist) => {
            await playlistStorage.setCurrentQueue(playlist);
            return playlist;
        },
        onSuccess: () => invalidatePlaylists(),
    });

    // Guarda permanentemente una lista
    const savePlaylist = useMutation({
        mutationFn: async (playlist: Playlist) => {
            await playlistStorage.savePlaylist(playlist);
            
            // Si la lista que se guarda era la cola actual, la removemos de currentQueue (o la dejamos como lista activa)
            const currentQueue = await playlistStorage.getCurrentQueue();
            if (currentQueue && currentQueue.id === playlist.id) {
                // Borramos la cola actual porque ya fue guardada
                await playlistStorage.setCurrentQueue(null);
            }
        },
        onSuccess: () => invalidatePlaylists(),
    });

    // Actualiza el progreso (canción y tiempo) de una playlist
    const updateProgress = useMutation({
        mutationFn: async ({ playlistId, songId, time }: { playlistId: string, songId: string, time: number }) => {
            // Verificar si es la cola actual
            const queue = await playlistStorage.getCurrentQueue();
            if (queue && queue.id === playlistId) {
                queue.lastPlayedSongId = songId;
                queue.lastPlayedTime = time;
                queue.updatedAt = Date.now();
                await playlistStorage.setCurrentQueue(queue);
                return;
            }
            
            // Si no, verificar en guardadas
            const saved = await playlistStorage.getSavedPlaylists();
            const index = saved.findIndex(p => p.id === playlistId);
            if (index >= 0) {
                saved[index].lastPlayedSongId = songId;
                saved[index].lastPlayedTime = time;
                saved[index].updatedAt = Date.now();
                await playlistStorage.setSavedPlaylists(saved);
            }
        },
        onSuccess: () => invalidatePlaylists(),
    });

    // Elimina permanentemente una lista
    const deletePlaylist = useMutation({
        mutationFn: async (id: string) => {
            await playlistStorage.deletePlaylist(id);
        },
        onSuccess: () => invalidatePlaylists(),
    });

    return {
        addToCurrentQueue,
        playNewSong,
        replaceCurrentQueue,
        savePlaylist,
        deletePlaylist,
        updateProgress,
    };
};
