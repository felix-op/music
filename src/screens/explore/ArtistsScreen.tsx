import React from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAppFont } from "@services";
import { Artist } from "@models/artist";

interface MappedArtist extends Artist {
    color: string;
}

const MOCK_ARTISTS: MappedArtist[] = [
    { id: 101, name: "DeepMind Wave", cantAlbums: 5, color: "#8B5CF6" },
    { id: 102, name: "Cyber Explorer", cantAlbums: 2, color: "#00F2FE" },
    { id: 103, name: "Stellar Harmony", cantAlbums: 4, color: "#FF007F" },
    { id: 104, name: "Astro Orchestra", cantAlbums: 2, color: "#F59E0B" },
    { id: 105, name: "Synth Rider", cantAlbums: 3, color: "#10B981" },
    { id: 106, name: "Supernova Band", cantAlbums: 3, color: "#6366F1" },
];

export default function ArtistsScreen() {
    const { fontFamilyBold, fontFamilyRegular } = useAppFont();

    return (
        <FlatList
            data={MOCK_ARTISTS}
            keyExtractor={(item) => item.id.toString()}
            numColumns={3}
            columnWrapperStyle={styles.row}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
                <Pressable
                    style={({ pressed }) => [
                        styles.card,
                        pressed && { opacity: 0.8, transform: [{ scale: 0.96 }] }
                    ]}
                >
                    {/* Circular Avatar */}
                    <View style={[styles.avatar, { backgroundColor: item.color }]}>
                        <Ionicons name="person" size={28} color="#ffffff" style={styles.personIcon} />
                        {/* Shiny overlay */}
                        <View style={styles.glossyOverlay} />
                    </View>

                    {/* Text details */}
                    <Text
                        style={[styles.name, { fontFamily: fontFamilyBold }]}
                        numberOfLines={1}
                    >
                        {item.name}
                    </Text>
                    <Text
                        style={[styles.albumsCount, { fontFamily: fontFamilyRegular }]}
                        numberOfLines={1}
                    >
                        {item.cantAlbums} {item.cantAlbums === 1 ? "álbum" : "álbumes"}
                    </Text>
                </Pressable>
            )}
        />
    );
}

const styles = StyleSheet.create({
    row: {
        justifyContent: "space-between",
        marginBottom: 20,
    },
    card: {
        width: "30%",
        alignItems: "center",
        backgroundColor: "#151124", // Premium cosmic card background
        borderRadius: 14,
        paddingVertical: 12,
        paddingHorizontal: 6,
        borderWidth: 1.5,
        borderColor: "#221b3a",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 4,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
    },
    personIcon: {
        opacity: 0.9,
    },
    glossyOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(255, 255, 255, 0.08)",
    },
    name: {
        fontSize: 11,
        color: "#ffffff",
        marginTop: 8,
        textAlign: "center",
        width: "100%",
    },
    albumsCount: {
        fontSize: 9,
        color: "#a6a0c5", // Soft cosmic lavender
        marginTop: 4,
        textAlign: "center",
        width: "100%",
    },
});
