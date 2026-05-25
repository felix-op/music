import React from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAppFont } from "@services";
import { Music } from "@models/music";
import { Genre } from "@models/genre";
import { Artist } from "@models/artist";
import { Album } from "@models/album";

interface MappedMusic extends Music {
    color: string;
}

const GENRE_ELEC: Genre = { id: 1, name: "Electrónica" };
const GENRE_ROCK: Genre = { id: 2, name: "Rock" };
const GENRE_CLAS: Genre = { id: 3, name: "Clásica" };

const ARTIST_ELEC: Artist = { id: 101, name: "DeepMind Wave", cantAlbums: 5 };
const ARTIST_CYBER: Artist = { id: 102, name: "Cyber Explorer", cantAlbums: 2 };
const ARTIST_STELLAR: Artist = { id: 103, name: "Stellar Harmony", cantAlbums: 4 };
const ARTIST_GALAXY: Artist = { id: 104, name: "Galaxy Grid", cantAlbums: 3 };
const ARTIST_SYNTH: Artist = { id: 105, name: "Synth Rider", cantAlbums: 3 };
const ARTIST_SHADOW: Artist = { id: 106, name: "Shadow Echo", cantAlbums: 1 };

const ALBUM_ELEC: Album = { id: 201, name: "Cosmic Antigravity", artist: ARTIST_ELEC, musics: [] };
const ALBUM_CYBER: Album = { id: 202, name: "Neon Aurora", artist: ARTIST_CYBER, musics: [] };
const ALBUM_STELLAR: Album = { id: 203, name: "Nebula Dreams", artist: ARTIST_STELLAR, musics: [] };
const ALBUM_GALAXY: Album = { id: 204, name: "Stardust Symphony", artist: ARTIST_GALAXY, musics: [] };
const ALBUM_SYNTH: Album = { id: 205, name: "Retro Pulse", artist: ARTIST_SYNTH, musics: [] };
const ALBUM_SHADOW: Album = { id: 206, name: "Shadow Echoes", artist: ARTIST_SHADOW, musics: [] };

const MOCK_TRACKS: MappedMusic[] = [
    { id: 301, name: "Gravity Pull", date: "2026-05-20", genres: [GENRE_ELEC], artist: ARTIST_ELEC, album: ALBUM_ELEC, duration: "3:45", color: "#8B5CF6" },
    { id: 302, name: "Cybernetic Highway", date: "2025-11-12", genres: [GENRE_ELEC], artist: ARTIST_CYBER, album: ALBUM_CYBER, duration: "4:12", color: "#00F2FE" },
    { id: 303, name: "Symphony of Stars", date: "2026-02-04", genres: [GENRE_CLAS], artist: ARTIST_STELLAR, album: ALBUM_STELLAR, duration: "5:23", color: "#FF007F" },
    { id: 304, name: "Lofi Moonlight", date: "2025-08-30", genres: [GENRE_CLAS], artist: ARTIST_GALAXY, album: ALBUM_GALAXY, duration: "2:58", color: "#F59E0B" },
    { id: 305, name: "Outrun Sunrise", date: "2025-09-15", genres: [GENRE_ELEC], artist: ARTIST_SYNTH, album: ALBUM_SYNTH, duration: "3:50", color: "#10B981" },
    { id: 306, name: "Shadow Echoes", date: "2026-04-01", genres: [GENRE_ROCK], artist: ARTIST_SHADOW, album: ALBUM_SHADOW, duration: "4:05", color: "#6366F1" },
];

export default function MusicsScreen() {
    const { fontFamilyBold, fontFamilyRegular } = useAppFont();

    return (
        <FlatList
            data={MOCK_TRACKS}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.list}
            renderItem={({ item }) => (
                <Pressable
                    style={({ pressed }) => [
                        styles.trackRow,
                        pressed && { opacity: 0.9, transform: [{ scale: 0.99 }] }
                    ]}
                >
                    {/* Mini Thumbnail */}
                    <View style={[styles.thumbnail, { backgroundColor: item.color }]}>
                        <Ionicons name="musical-note" size={20} color="#ffffff" />
                        <View style={styles.glossyOverlay} />
                    </View>

                    {/* Track & Artist Info */}
                    <View style={styles.infoCol}>
                        <Text
                            style={[styles.trackTitle, { fontFamily: fontFamilyBold }]}
                            numberOfLines={1}
                        >
                            {item.name}
                        </Text>
                        <Text
                            style={[styles.trackArtist, { fontFamily: fontFamilyRegular }]}
                            numberOfLines={1}
                        >
                            {item.artist.name}
                        </Text>
                    </View>

                    {/* Duration and Play Button */}
                    <View style={styles.actionsRow}>
                        <Text style={[styles.duration, { fontFamily: fontFamilyRegular }]}>
                            {item.duration}
                        </Text>
                        <Pressable style={({ pressed }) => [pressed && { opacity: 0.7 }]}>
                            <Ionicons name="play-circle" size={32} color="#8B5CF6" />
                        </Pressable>
                    </View>
                </Pressable>
            )}
        />
    );
}

const styles = StyleSheet.create({
    list: {
        paddingBottom: 20,
    },
    trackRow: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#151124", // Cosmic dark purple card
        borderRadius: 12,
        padding: 10,
        marginBottom: 12,
        borderWidth: 1.5,
        borderColor: "#221b3a", // Subtle dark cosmic border
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    thumbnail: {
        width: 44,
        height: 44,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
    },
    glossyOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(255, 255, 255, 0.08)",
    },
    infoCol: {
        flex: 1,
        marginLeft: 12,
        justifyContent: "center",
    },
    trackTitle: {
        fontSize: 14,
        color: "#ffffff",
    },
    trackArtist: {
        fontSize: 12,
        color: "#a6a0c5", // Soft cosmic lavender
        marginTop: 2,
    },
    actionsRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    duration: {
        fontSize: 12,
        color: "#8b86a4", // Muted cosmic lavender
        marginRight: 12,
    },
});
