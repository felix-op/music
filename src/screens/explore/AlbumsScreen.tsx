import { AlbumDeezer, AlbumPlaceholder, GenrePlaceholder } from "@components";
import { Ionicons } from "@expo/vector-icons";
import { AlbumDezzerGenre, AlbumDezzerModel } from "@models/albumDezzer";
import { ThemePalette } from "@models/theme";
import { useAppFont, useAppTheme } from "@services";
import { router } from "expo-router";
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { useGetAlbumsByGenre } from "../../hooks/useGetAlbumsByGenre";
import { useGetGenres } from "../../hooks/useGetGenres";

// ─── SeeMoreCard ────────────────────────────────────────────────────────────

type SeeMoreCardProps = {
    width: number;
    onPress: () => void;
    theme: ThemePalette;
    fontFamilyBold: string;
};

function SeeMoreCard({ width, onPress, theme, fontFamilyBold }: SeeMoreCardProps) {
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [
                { width },
                pressed && { opacity: 0.8, transform: [{ scale: 0.97 }] },
            ]}
        >
            <View
                style={[
                    seeMoreStyles.coverContainer,
                    {
                        borderColor: theme.primary.main + "55",
                        backgroundColor: theme.primary.dark + "22",
                    },
                ]}
            >
                <View style={seeMoreStyles.iconRing}>
                    <Ionicons name="chevron-forward" size={22} color={theme.primary.light} />
                </View>
                <Text style={[seeMoreStyles.label, { fontFamily: fontFamilyBold, color: theme.primary.light }]}>
                    Ver más
                </Text>
                <View style={seeMoreStyles.glossy} />
            </View>
            <View style={seeMoreStyles.infoSpacer} />
        </Pressable>
    );
}

const seeMoreStyles = StyleSheet.create({
    coverContainer: {
        width: "100%",
        aspectRatio: 1,
        borderRadius: 10,
        borderWidth: 1.5,
        borderStyle: "dashed",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        overflow: "hidden",
        position: "relative",
    },
    iconRing: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: "rgba(139,92,246,0.18)",
        alignItems: "center",
        justifyContent: "center",
    },
    label: {
        fontSize: 13,
    },
    glossy: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(255,255,255,0.02)",
    },
    infoSpacer: {
        height: 42,
    },
});

// ─── GenreAlbumsRow ──────────────────────────────────────────────────────────

type GenreAlbumsRowProps = {
    genre: AlbumDezzerGenre;
    onVerMas: (genre: AlbumDezzerGenre) => void;
    theme: ThemePalette;
    fontFamilyBold: string;
    fontFamilyRegular: string;
};

function GenreAlbumsRow({ genre, onVerMas, theme, fontFamilyBold, fontFamilyRegular }: GenreAlbumsRowProps) {
    const { data: albums, isLoading } = useGetAlbumsByGenre(genre.id);

    const handleAlbumPress = (album: AlbumDezzerModel) => {
        router.push({
            pathname: "/explore/albums/[id]",
            params: { id: album.id, nombre: album.title },
        });
    };

    return (
        <View style={styles.genreSection}>
            {/* Género header */}
            <View style={styles.genreHeader}>
                <Text style={[styles.genreTitle, { fontFamily: fontFamilyBold }]}>
                    {genre.name}
                </Text>
                <Pressable
                    onPress={() => onVerMas(genre)}
                    style={({ pressed }) => [
                        styles.verMasLink,
                        pressed && { opacity: 0.55 },
                    ]}
                >
                    <Text style={[styles.verMasLinkText, { fontFamily: fontFamilyRegular }]}>
                        Ver más
                    </Text>
                    <Ionicons
                        name="chevron-forward"
                        size={13}
                        color={theme.text.secondary}
                    />
                </Pressable>
            </View>

            {/* Lista horizontal */}
            {isLoading ? (
                <FlatList
                    horizontal
                    data={[1, 2, 3, 4, 5]}
                    keyExtractor={(item) => item.toString()}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.horizontalListContainer}
                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                    renderItem={() => <AlbumPlaceholder width={140} />}
                />
            ) : (
                <FlatList
                    horizontal
                    data={albums}
                    keyExtractor={(album) => album.id.toString()}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.horizontalListContainer}
                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                    ListEmptyComponent={
                        <View style={styles.emptyRow}>
                            <ActivityIndicator size="small" color={theme.primary.main} />
                        </View>
                    }
                    ListFooterComponent={() => (
                        <View style={styles.seeMoreWrapper}>
                            <SeeMoreCard
                                width={140}
                                onPress={() => onVerMas(genre)}
                                theme={theme}
                                fontFamilyBold={fontFamilyBold}
                            />
                        </View>
                    )}
                    renderItem={({ item: album }) => (
                        <AlbumDeezer
                            album={album}
                            width={140}
                            onPress={() => handleAlbumPress(album)}
                        />
                    )}
                />
            )}
        </View>
    );
}

// ─── AlbumsScreen ─────────────────────────────────────────────────────────────

export default function AlbumsScreen() {
    const { fontFamilyBold, fontFamilyRegular } = useAppFont();
    const { theme } = useAppTheme();

    const { data: genresResponse, isLoading } = useGetGenres();
    const genres = genresResponse?.data ?? [];

    const handleVerMas = (genre: AlbumDezzerGenre) => {
        router.push({
            pathname: "/explore/albums/genre/[genre]",
            params: { genre: genre.id, genreName: genre.name },
        });
    };

    if (isLoading) {
        return (
            <FlatList
                data={[1, 2, 3]}
                keyExtractor={(item) => item.toString()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContainer}
                renderItem={() => (
                    <GenrePlaceholder renderItem={() => <AlbumPlaceholder width={140} />} />
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
                <GenreAlbumsRow
                    genre={genre}
                    onVerMas={handleVerMas}
                    theme={theme}
                    fontFamilyBold={fontFamilyBold}
                    fontFamilyRegular={fontFamilyRegular}
                />
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
    verMasLink: {
        flexDirection: "row",
        alignItems: "center",
        gap: 2,
    },
    verMasLinkText: {
        fontSize: 13,
        color: "#a6a0c5",
    },
    horizontalListContainer: {
        paddingHorizontal: 2,
        paddingBottom: 8,
    },
    separator: {
        width: 14,
    },
    seeMoreWrapper: {
        marginLeft: 14,
    },
    emptyRow: {
        width: 140,
        aspectRatio: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});
