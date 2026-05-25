import { Artist } from "@models/artist";
import { MOCK_ARTISTS } from "./mockData";

const delay = <T>(value: T): Promise<T> => {
    return new Promise((resolve) => setTimeout(() => resolve(value), 1000));
};

export const ArtistsApi = {
    /**
     * Fetch a single artist by ID
     */
    getById: (id: number): Promise<Artist | undefined> => {
        return delay(MOCK_ARTISTS.find((artist) => artist.id === id));
    },

    /**
     * Fetch all artists
     */
    getAll: (): Promise<Artist[]> => {
        return delay(MOCK_ARTISTS);
    },
};
