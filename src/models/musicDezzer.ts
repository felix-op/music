export interface MusicDezzerArtist {
    id: number;
    name: string;
    link?: string;
    picture?: string;
    picture_small?: string;
    picture_medium?: string;
    picture_big?: string;
    picture_xl?: string;
    radio?: boolean;
}

export interface MusicDezzerAlbum {
    id: number;
    title: string;
    cover?: string;
    cover_small?: string;
    cover_medium?: string;
    cover_big?: string;
    cover_xl?: string;
}

export interface MusicDezzerModel {
    id: number;
    readable?: boolean;
    title: string;
    title_short: string;
    title_version?: string;
    isrc?: string;
    link: string;
    duration: number;
    rank: number;
    explicit_lyrics: boolean;
    preview: string;
    position?: number;
    bpm?: number;
    gain?: number;
    track_position?: number;
    disk_number?: number;
    release_date?: string;
    artist: MusicDezzerArtist;
    album: MusicDezzerAlbum;
}
