import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';
import { usePlaylistsLocal } from '../../hooks/usePlaylistsLocal';
import { usePlaylistMutations } from '../../hooks/usePlaylistMutations';
import { Playlist, PlaylistSong } from '../../models';

interface PlayerContextData {
    queue: Playlist | null;
    currentSong: PlaylistSong | null;
    isPlaying: boolean;
    isPlayerLoading: boolean;
    positionMillis: number;
    durationMillis: number;
    play: (song: Omit<PlaylistSong, 'addedAt' | 'order'>) => Promise<void>;
    playFromQueue: (songId?: string) => void;
    pause: () => void;
    resume: () => void;
    next: () => void;
    prev: () => void;
}

export const PlayerContext = createContext<PlayerContextData>({} as PlayerContextData);

export const PlayerProvider = ({ children }: { children: React.ReactNode }) => {
    const { currentQueue, isLoading: isLoadingQueue } = usePlaylistsLocal();
    const { addToCurrentQueue, playNewSong } = usePlaylistMutations();

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentSong, setCurrentSong] = useState<PlaylistSong | null>(null);

    const player = useAudioPlayer(currentSong?.previewUrl || null);
    const status = useAudioPlayerStatus(player);

    // Reproducir / pausar basado en nuestro estado local isPlaying y si el reproductor está listo
    useEffect(() => {
        if (isPlaying) {
            if (status.isLoaded) {
                player.play();
            }
        } else {
            player.pause();
        }
    }, [isPlaying, player, status.isLoaded]);

    // Track finish -> next
    useEffect(() => {
        if (status.didJustFinish) {
            next();
        }
    }, [status.didJustFinish]);

    // Sincronizar currentSong con la cola actual cuando cambia
    useEffect(() => {
        if (currentQueue && currentQueue.songs.length > 0) {
            // Solo cambiar la canción actual si no hay ninguna o si la actual no pertenece a esta cola
            const songExistsInQueue = currentSong && currentQueue.songs.some(s => s.id === currentSong.id);
            
            if (!songExistsInQueue) {
                const lastPlayed = currentQueue.songs.find(s => s.id === currentQueue.lastPlayedSongId);
                setCurrentSong(lastPlayed || currentQueue.songs[0]);
            }
        } else {
            setCurrentSong(null);
        }
    }, [currentQueue]);

    const play = async (songInput: Omit<PlaylistSong, 'addedAt' | 'order'>) => {
        const newSong: PlaylistSong = {
            ...songInput,
            addedAt: Date.now(),
            order: currentQueue ? currentQueue.songs.length : 0
        };

        // El usuario pidió: "primero debería agregarse a la cola, luego debería empezar a reproducirse y si lo tiene que traer de la API puede esperar"
        await addToCurrentQueue.mutateAsync(newSong);
        
        setCurrentSong(newSong);
        setIsPlaying(true);
    };

    const playFromQueue = (songId?: string) => {
        if (!currentQueue) return;
        if (songId) {
            const target = currentQueue.songs.find(s => s.id === songId);
            if (target) setCurrentSong(target);
        } else if (!currentSong) {
            const lastPlayed = currentQueue.songs.find(s => s.id === currentQueue.lastPlayedSongId);
            setCurrentSong(lastPlayed || currentQueue.songs[0]);
        }
        setIsPlaying(true);
    };

    const pause = () => setIsPlaying(false);
    
    const resume = () => {
        if (currentSong) setIsPlaying(true);
    };

    const next = () => {
        if (!currentQueue) return;
        const index = currentQueue.songs.findIndex(s => s.id === currentSong?.id);
        if (index >= 0 && index < currentQueue.songs.length - 1) {
            setCurrentSong(currentQueue.songs[index + 1]);
            setIsPlaying(true);
        } else if (index === currentQueue.songs.length - 1) {
            // Podríamos detener la reproducción si es la última
            setIsPlaying(false);
        }
    };

    const prev = () => {
        if (!currentQueue) return;
        const index = currentQueue.songs.findIndex(s => s.id === currentSong?.id);
        if (index > 0) {
            setCurrentSong(currentQueue.songs[index - 1]);
            setIsPlaying(true);
        }
    };

    return (
        <PlayerContext.Provider
            value={{
                queue: currentQueue || null,
                currentSong,
                isPlaying,
                isPlayerLoading: isLoadingQueue,
                positionMillis: (status.currentTime || 0) * 1000,
                durationMillis: (status.duration || 0) * 1000,
                play,
                playFromQueue,
                pause,
                resume,
                next,
                prev
            }}
        >
            {children}
        </PlayerContext.Provider>
    );
};
