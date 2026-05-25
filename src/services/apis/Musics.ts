import { Music } from "@models/music";
import { MOCK_MUSICS } from "./mockData";

const delay = <T>(value: T): Promise<T> => {
    return new Promise((resolve) => setTimeout(() => resolve(value), 1000));
};

export const MusicsApi = {
    /**
     * Fetch a single track by ID
     */
    getById: (id: number): Promise<Music | undefined> => {
        return delay(MOCK_MUSICS.find((music) => music.id === id));
    },

    /**
     * Fetch all tracks
     */
    getAll: (): Promise<Music[]> => {
        return delay(MOCK_MUSICS);
    },
};
