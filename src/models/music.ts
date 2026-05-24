import { Album } from "./album";
import { Artist } from "./artist";
import { Genre } from "./genre";

export interface Music {
    id: number;
    name: string;
    date: string;
    genres: Genre[];
    artist: Artist;
    album: Album;
    duration: string;
}
