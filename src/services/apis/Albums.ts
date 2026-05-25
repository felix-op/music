import { Album } from "@models/album";
import { MOCK_ALBUMS } from "./mockData";

const delay = <T>(value: T): Promise<T> => {
    return new Promise((resolve) => setTimeout(() => resolve(value), 1000));
};

export const AlbumsApi = {
    /**
     * Fetch a single album by ID
     */
    getById: (id: number): Promise<Album | undefined> => {
        return delay(MOCK_ALBUMS.find((album) => album.id === id));
    },

    /**
     * Fetch all albums
     */
    getAll: (): Promise<Album[]> => {
        return delay(MOCK_ALBUMS);
    },
};
