import { MusicDezzerModel } from "./musicDezzer";

export interface AlbumDezzerArtist {
    id: number;
    name: string;
    picture?: string;
    picture_small?: string;
    picture_medium?: string;
    picture_big?: string;
    picture_xl?: string;
    radio?: boolean;
    tracklist?: string;
    link?: string;
    share?: string;
    nb_album?: number;
    nb_fan?: number;
}

export interface AlbumDezzerGenre {
    id: number;
    name: string;
    picture?: string;
    picture_small?: string;
    picture_medium?: string;
    picture_big?: string;
    picture_xl?: string;
}

export interface AlbumDezzerModel {
    id: number;
    title: string;
    link?: string;
    cover?: string;
    cover_small?: string;
    cover_medium?: string;
    cover_big?: string;
    cover_xl?: string;
    md5_image?: string;
    genre_id?: number;
    label?: string;
    nb_tracks?: number;
    duration?: number;
    fans?: number;
    release_date?: string;
    record_type?: string;
    available?: boolean;
    tracklist?: string;
    explicit_lyrics?: boolean;
    explicit_content_lyrics?: number;
    explicit_content_cover?: number;
    position?: number;
    artist: AlbumDezzerArtist;
    tracks?: {
        data: MusicDezzerModel[];
    };
}

export type DeezerAlbumListResponse = {
    data: AlbumDezzerModel[];
    total: number;
    next?: string;
};

export type DeezerGenreListResponse = {
    data: AlbumDezzerGenre[];
};
