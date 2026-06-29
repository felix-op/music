import { Artist } from "./artist";
import { Music } from "./music";

export interface Album {
    id: number;
    name: string;
    artist: Artist;
    musics: Music[];
    image?: string;
    coverColor?: string;
    year?: string;
}
