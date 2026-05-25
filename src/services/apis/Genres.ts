import { Genre } from "@models/genre";
import {
    MOCK_GENRES,
    MOCK_ALBUMS,
    MOCK_MUSICS,
    GenreWithAlbums,
    GenreWithMusics,
    GenreWithArtists
} from "./mockData";

const delay = <T>(value: T): Promise<T> => {
    return new Promise((resolve) => setTimeout(() => resolve(value), 1000));
};

export const GenresApi = {
    /**
     * Returns only the genres (id, name)
     */
    getGenres: (): Promise<Genre[]> => {
        return delay(MOCK_GENRES);
    },

    /**
     * Returns genres with their associated albums list
     */
    getGenresWithAlbums: (): Promise<GenreWithAlbums[]> => {
        const data = MOCK_GENRES.map((genre) => ({
            ...genre,
            albums: MOCK_ALBUMS.filter((album) =>
                album.musics.some((music) => music.genres.some((g) => g.id === genre.id))
            ),
        }));
        return delay(data);
    },

    /**
     * Returns genres with their associated musics list
     */
    getGenresWithMusics: (): Promise<GenreWithMusics[]> => {
        const data = MOCK_GENRES.map((genre) => ({
            ...genre,
            musics: MOCK_MUSICS.filter((music) => music.genres.some((g) => g.id === genre.id)),
        }));
        return delay(data);
    },

    /**
     * Returns genres with their associated artists list
     */
    getGenresWithArtists: (): Promise<GenreWithArtists[]> => {
        const data = MOCK_GENRES.map((genre) => {
            const artistMap = new Map<number, any>();
            MOCK_MUSICS.forEach((music) => {
                if (music.genres.some((g) => g.id === genre.id)) {
                    artistMap.set(music.artist.id, music.artist);
                }
            });
            return {
                ...genre,
                artists: Array.from(artistMap.values()),
            };
        });
        return delay(data);
    },
};
