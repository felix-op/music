import { Genre } from "@models/genre";
import { Artist } from "@models/artist";
import { Album } from "@models/album";
import { Music } from "@models/music";

export interface GenreWithAlbums extends Genre {
    albums: Album[];
}

export interface GenreWithMusics extends Genre {
    musics: Music[];
}

export interface GenreWithArtists extends Genre {
    artists: Artist[];
}

export const MOCK_GENRES: Genre[] = [
    { id: 1, name: "Rock" },
    { id: 2, name: "Electrónica" },
    { id: 3, name: "Clásica" },
];

export const MOCK_ARTISTS: Artist[] = [
    { id: 101, name: "Nebula Fury", cantAlbums: 4 },
    { id: 102, name: "Stellar Crash", cantAlbums: 2 },
    { id: 103, name: "Supernova Band", cantAlbums: 3 },
    { id: 104, name: "Asteroid Dust", cantAlbums: 1 },
    { id: 201, name: "DeepMind Wave", cantAlbums: 5 },
    { id: 202, name: "Cyber Explorer", cantAlbums: 2 },
    { id: 203, name: "Synth Rider", cantAlbums: 3 },
    { id: 204, name: "Vector Glide", cantAlbums: 1 },
    { id: 301, name: "Stellar Harmony", cantAlbums: 4 },
    { id: 302, name: "Astro Orchestra", cantAlbums: 2 },
    { id: 303, name: "Celeste Ensemble", cantAlbums: 3 },
    { id: 304, name: "Frequency Quartet", cantAlbums: 1 },
];

export const MOCK_ALBUMS: Album[] = [
    // Rock Albums
    { id: 1001, name: "Astral Collision", artist: MOCK_ARTISTS[0], coverColor: "#EF4444", year: "2026", musics: [] },
    { id: 1002, name: "Gravity Core", artist: MOCK_ARTISTS[1], coverColor: "#F59E0B", year: "2025", musics: [] },
    { id: 1003, name: "Void Echoes", artist: MOCK_ARTISTS[2], coverColor: "#DC2626", year: "2026", musics: [] },
    { id: 1004, name: "Cosmic Thunder", artist: MOCK_ARTISTS[3], coverColor: "#B91C1C", year: "2024", musics: [] },
    // Electrónica Albums
    { id: 2001, name: "Cosmic Antigravity", artist: MOCK_ARTISTS[4], coverColor: "#8B5CF6", year: "2026", musics: [] },
    { id: 2002, name: "Neon Aurora", artist: MOCK_ARTISTS[5], coverColor: "#00F2FE", year: "2025", musics: [] },
    { id: 2003, name: "Retro Pulse", artist: MOCK_ARTISTS[6], coverColor: "#10B981", year: "2025", musics: [] },
    { id: 2004, name: "Grid Walker", artist: MOCK_ARTISTS[7], coverColor: "#6366F1", year: "2026", musics: [] },
    // Clásica Albums
    { id: 3001, name: "Nebula Dreams", artist: MOCK_ARTISTS[8], coverColor: "#FF007F", year: "2026", musics: [] },
    { id: 3002, name: "Lunar Sonata", artist: MOCK_ARTISTS[9], coverColor: "#EC4899", year: "2024", musics: [] },
    { id: 3003, name: "Stardust Symphony", artist: MOCK_ARTISTS[10], coverColor: "#D946EF", year: "2025", musics: [] },
    { id: 3004, name: "Quantum Opus", artist: MOCK_ARTISTS[11], coverColor: "#A21CAF", year: "2026", musics: [] },
];

export const MOCK_MUSICS: Music[] = [
    // Rock tracks
    { id: 10001, name: "Astral Collision", date: "2026-01-10", genres: [MOCK_GENRES[0]], artist: MOCK_ARTISTS[0], album: MOCK_ALBUMS[0], duration: "3:45" },
    { id: 10002, name: "Gravity Core", date: "2025-06-21", genres: [MOCK_GENRES[0]], artist: MOCK_ARTISTS[1], album: MOCK_ALBUMS[1], duration: "4:12" },
    { id: 10003, name: "Core Shift", date: "2025-06-25", genres: [MOCK_GENRES[0]], artist: MOCK_ARTISTS[1], album: MOCK_ALBUMS[1], duration: "3:30" },
    { id: 10004, name: "Void Echoes Outro", date: "2026-03-14", genres: [MOCK_GENRES[0]], artist: MOCK_ARTISTS[2], album: MOCK_ALBUMS[2], duration: "4:05" },
    { id: 10005, name: "Cosmic Thunder Blast", date: "2024-12-01", genres: [MOCK_GENRES[0]], artist: MOCK_ARTISTS[3], album: MOCK_ALBUMS[3], duration: "2:58" },
    // Electrónica tracks
    { id: 20001, name: "Gravity Pull", date: "2026-05-20", genres: [MOCK_GENRES[1]], artist: MOCK_ARTISTS[4], album: MOCK_ALBUMS[4], duration: "3:45" },
    { id: 20002, name: "Cybernetic Highway", date: "2025-11-12", genres: [MOCK_GENRES[1]], artist: MOCK_ARTISTS[5], album: MOCK_ALBUMS[5], duration: "4:12" },
    { id: 20003, name: "Outrun Sunrise", date: "2025-09-15", genres: [MOCK_GENRES[1]], artist: MOCK_ARTISTS[6], album: MOCK_ALBUMS[6], duration: "3:50" },
    { id: 20004, name: "Grid Walker Title", date: "2026-01-20", genres: [MOCK_GENRES[1]], artist: MOCK_ARTISTS[7], album: MOCK_ALBUMS[7], duration: "4:20" },
    // Clásica tracks
    { id: 30001, name: "Symphony of Stars", date: "2026-02-04", genres: [MOCK_GENRES[2]], artist: MOCK_ARTISTS[8], album: MOCK_ALBUMS[8], duration: "5:23" },
    { id: 30002, name: "Lofi Moonlight", date: "2025-08-30", genres: [MOCK_GENRES[2]], artist: MOCK_ARTISTS[9], album: MOCK_ALBUMS[9], duration: "2:58" },
    { id: 30003, name: "Stardust Symphony", date: "2025-10-05", genres: [MOCK_GENRES[2]], artist: MOCK_ARTISTS[10], album: MOCK_ALBUMS[10], duration: "6:15" },
    { id: 30004, name: "Quantum Opus", date: "2026-04-18", genres: [MOCK_GENRES[2]], artist: MOCK_ARTISTS[11], album: MOCK_ALBUMS[11], duration: "4:50" },
];

// Initialize relationships
MOCK_ALBUMS.forEach((album) => {
    album.musics = MOCK_MUSICS.filter((m) => m.album.id === album.id);
});
