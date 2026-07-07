export interface PlaylistSong {
    id: string; // The song id
    addedAt: number; // Timestamp
    order: number;
    source: 'local' | 'deezer';
    title?: string;
    artist?: string;
    duration?: number;
    coverUrl?: string;
    previewUrl?: string;
}

export interface Playlist {
    id: string;
    name: string;
    createdAt: number;
    updatedAt: number;
    isPermanent: boolean; // if false, it's a temporary current queue
    songs: PlaylistSong[];
    lastPlayedSongId?: string;
    lastPlayedTime?: number; // In seconds/minutes depending on implementation
}
