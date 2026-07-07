import React, { createContext, useContext, useEffect, useState } from 'react';
import { usePlaylistsLocal } from '../../hooks/usePlaylistsLocal';
import { usePlaylistMutations } from '../../hooks/usePlaylistMutations';
import { Playlist, PlaylistSong } from '../../models';

interface PlayerContextData {
    queue: Playlist | null;
    currentSong: PlaylistSong | null;
    isPlaying: boolean;
    isPlayerLoading: boolean;
    play: (song: Omit<PlaylistSong, 'addedAt' | 'order'>) => void;
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

    // Sincronizar currentSong con la cola actual cuando cambia
    useEffect(() => {
        if (currentQueue && currentQueue.songs.length > 0) {
            const lastPlayed = currentQueue.songs.find(s => s.id === currentQueue.lastPlayedSongId);
            setCurrentSong(lastPlayed || currentQueue.songs[0]);
        } else {
            setCurrentSong(null);
        }
    }, [currentQueue]);

    const play = (songInput: Omit<PlaylistSong, 'addedAt' | 'order'>) => {
        const newSong: PlaylistSong = {
            ...songInput,
            addedAt: Date.now(),
            order: currentQueue ? currentQueue.songs.length : 0
        };

        if (!currentQueue || currentQueue.isPermanent) {
            newSong.order = 0;
            playNewSong.mutate(newSong);
        } else {
            addToCurrentQueue.mutate(newSong);
        }
        setCurrentSong(newSong);
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
                play,
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
