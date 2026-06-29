import { Music } from "@models/music";
import { MOCK_MUSICS } from "./mockData";

const delay = <T>(value: T): Promise<T> => {
    return new Promise((resolve) => setTimeout(() => resolve(value), 1000));
};

export type MusicFilters = {
    genreId?: number;
    albumId?: number;
    artistId?: number;
};

export const MusicsApi = {
    getById: (id: number): Promise<Music | undefined> => {
        return delay(MOCK_MUSICS.find((music) => music.id === id));
    },

    getAll: (): Promise<Music[]> => {
        return delay(MOCK_MUSICS);
    },

    getFiltered: (filters?: MusicFilters): Promise<Music[]> => {
        let result = MOCK_MUSICS;
        if (filters?.genreId)  result = result.filter(m => m.genres.some(g => g.id === filters.genreId));
        if (filters?.albumId)  result = result.filter(m => m.album.id === filters.albumId);
        if (filters?.artistId) result = result.filter(m => m.artist.id === filters.artistId);
        return delay(result);
    },
};
