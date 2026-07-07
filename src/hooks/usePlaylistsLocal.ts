import { useQuery } from '@tanstack/react-query';
import { playlistStorage } from '../services/storage/playlistStorage';

export const usePlaylistsLocal = () => {
    // Obtener listas guardadas manualmente
    const { data: savedPlaylists, isLoading: isLoadingSaved, refetch: refetchSaved } = useQuery({
        queryKey: ['savedPlaylists'],
        queryFn: playlistStorage.getSavedPlaylists,
    });

    // Obtener la cola de reproducción actual
    const { data: currentQueue, isLoading: isLoadingQueue, refetch: refetchQueue } = useQuery({
        queryKey: ['currentQueue'],
        queryFn: playlistStorage.getCurrentQueue,
    });

    return {
        savedPlaylists: savedPlaylists ?? [],
        currentQueue,
        isLoading: isLoadingSaved || isLoadingQueue,
        refetchAll: () => {
            refetchSaved();
            refetchQueue();
        },
    };
};
