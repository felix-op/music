import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Album, AlbumPlaceholder, GenrePlaceholder } from "@components";
import { useAppFont, GenresApi, GenreWithAlbums } from "@services";

export default function AlbumsScreen() {
    const { fontFamilyBold } = useAppFont();
    const [genres, setGenres] = useState<GenreWithAlbums[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        GenresApi.getGenresWithAlbums()
            .then((data) => {
                setGenres(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error loading albums via API:", err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <FlatList
                data={[1, 2, 3]} // 3 mock genres
                keyExtractor={(item) => item.toString()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContainer}
                renderItem={() => (
                    <GenrePlaceholder
                        renderItem={() => <AlbumPlaceholder width={140} />}
                    />
                )}
            />
        );
    }

    return (
        <FlatList
            data={genres}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
            renderItem={({ item: genre }) => (
                <View style={styles.genreSection}>
                    {/* Genre Header */}
                    <View style={styles.genreHeader}>
                        <Text style={[styles.genreTitle, { fontFamily: fontFamilyBold }]}>
                            {genre.name}
                        </Text>
                    </View>

                    {/* Horizontal Albums List */}
                    <FlatList
                        horizontal
                        data={genre.albums}
                        keyExtractor={(album) => album.id.toString()}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.horizontalListContainer}
                        ItemSeparatorComponent={() => <View style={styles.separator} />}
                        renderItem={({ item: album }) => (
                            <Album
                                album={album}
                                width={140}
                            />
                        )}
                    />
                </View>
            )}
        />
    );
}

const styles = StyleSheet.create({
    listContainer: {
        paddingBottom: 24,
    },
    genreSection: {
        marginBottom: 24,
    },
    genreHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
        paddingHorizontal: 2,
    },
    genreTitle: {
        fontSize: 18,
        color: "#ffffff",
    },
    horizontalListContainer: {
        paddingHorizontal: 2,
        paddingBottom: 8, // padding for card shadows to avoid clipping
    },
    separator: {
        width: 14,
    },
});
