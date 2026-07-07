import { AlbumDezzerModel, DeezerAlbumListResponse, DeezerGenreListResponse } from "@models/albumDezzer";
import { DEEZER_BASE_URL } from "./MusicsDeezer";

export type { DeezerAlbumListResponse, DeezerGenreListResponse };

export const AlbumsDeezerApi = {
    genresUrl: () => `${DEEZER_BASE_URL}/genre`,
    albumsByGenreUrl: (genreId: number) => `${DEEZER_BASE_URL}/chart/${genreId}/albums`,
    albumByIdUrl: (id: number) => `${DEEZER_BASE_URL}/album/${id}`,
};
