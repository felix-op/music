export interface ArtistDezzerModel {
    id: number;
    name: string;
    picture?: string;
    picture_small?: string;
    picture_medium?: string;
    picture_big?: string;
    picture_xl?: string;
    radio?: boolean;
    tracklist?: string;
    type?: string;
}

export type DeezerArtistListResponse = {
    data: ArtistDezzerModel[];
    total?: number;
    next?: string;
};
