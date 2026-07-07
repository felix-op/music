import { DEEZER_BASE_URL } from "./MusicsDeezer";

export const ArtistsDeezerApi = {
    topArtistsUrl: () => `${DEEZER_BASE_URL}/chart/0/artists`,
    albumsByArtistUrl: (artistId: number) => `${DEEZER_BASE_URL}/artist/${artistId}/albums`,
};
