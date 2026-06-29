import { Album } from "@models/album";
import { MOCK_ALBUMS } from "./mockData";

const delay = <T>(value: T): Promise<T> => {
    return new Promise((resolve) => setTimeout(() => resolve(value), 1000));
};

export const AlbumsApi = {
    getById: (id: number): Promise<Album | undefined> => {
        return delay(MOCK_ALBUMS.find((album) => album.id === id));
    },

    getAll: (): Promise<Album[]> => {
        return delay(MOCK_ALBUMS);
    },

    getByGenreId: (genreId: number): Promise<Album[]> => {
        const albums = MOCK_ALBUMS.filter((album) =>
            album.musics.some((music) => music.genres.some((g) => g.id === genreId))
        );
        return delay(albums);
    },
};
