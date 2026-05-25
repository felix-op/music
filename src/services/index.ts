export {
    AppRoute,
    IconName,
    PLAYLIST_NAVBAR_ROUTES, playlistRoute, ROUTES, routesBuilder
} from "./rutas";
export { FontProvider } from "./providers/FontProvider";
export { FontContext, useAppFont, FontOption } from "./contexts/FontContext";

export { MusicsApi } from "./apis/Musics";
export { AlbumsApi } from "./apis/Albums";
export { ArtistsApi } from "./apis/Artists";
export { GenresApi } from "./apis/Genres";

export { GenreWithAlbums, GenreWithMusics, GenreWithArtists } from "./apis/mockData";
