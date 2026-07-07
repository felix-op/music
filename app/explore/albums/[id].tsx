import { MusicListItem, MusicPlaceholder } from "@components";
import { useGetAlbumById } from "../../../src/hooks/useGetAlbumById";
import { MusicDezzerModel } from "@models/musicDezzer";
import { useAppFont, useAppTheme } from "@services";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { FlatList, Image, Pressable, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Typography } from "@components";

type Params = {
    id: string;
    nombre?: string;
};

export default function AlbumDetailPage() {
    const { id, nombre } = useLocalSearchParams<Params>();
    const { theme } = useAppTheme();
    const [selectedId, setSelectedId] = useState<number | null>(null);

    const { data: album, isLoading } = useGetAlbumById(Number(id));

    const artistNames = album?.artist?.name ?? "";
    const coverUrl = album?.cover_medium ?? album?.cover_big ?? album?.cover ?? null;
    const musics = album?.tracks?.data ?? [];

    const handleMusicPress = (music: MusicDezzerModel) => {
        router.push({
            pathname: "/explore/music/[id]",
            params: { id: music.id, musicName: music.title },
        });
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.background.default }]}>
            <Stack.Screen
                options={{
                    headerShown: true,
                    title: "",
                    animation: "slide_from_right",
                    headerBackVisible: false,
                    headerLeft: () => (
                        <Pressable
                            onPress={() => router.back()}
                            style={({ pressed }) => [
                                styles.backButton,
                                pressed && { opacity: 0.5 },
                            ]}
                        >
                            <Ionicons
                                name="chevron-back"
                                size={26}
                                color={theme.text.primary}
                            />
                        </Pressable>
                    ),
                }}
            />

            {/* Cover + info */}
            <View style={styles.header}>
                {album ? (
                    <>
                        <View style={[styles.cover, { backgroundColor: theme.primary.main }]}>
                            {coverUrl ? (
                                <Image source={{ uri: coverUrl }} style={styles.coverImage} />
                            ) : (
                                <Ionicons
                                    name="disc"
                                    size={88}
                                    color="#ffffff"
                                    style={styles.discIcon}
                                />
                            )}
                            <View style={styles.glossy} />
                        </View>
                        <Typography
                            variant="h3"
                            weight="bold"
                            style={styles.albumName}
                            numberOfLines={2}
                        >
                            {album.title}
                        </Typography>
                        <Typography
                            variant="body"
                            color="secondary"
                            style={styles.artistName}
                            numberOfLines={1}
                        >
                            {artistNames}
                        </Typography>
                    </>
                ) : (
                    <View
                        style={[styles.cover, { backgroundColor: theme.background.paper }]}
                    />
                )}
            </View>

            {/* Music list */}
            <View style={styles.list}>
                {isLoading ? (
                    <FlatList
                        data={[1, 2, 3, 4, 5]}
                        keyExtractor={(item) => item.toString()}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.listContent}
                        renderItem={() => <MusicPlaceholder />}
                    />
                ) : (
                    <FlatList
                        data={musics}
                        keyExtractor={(item) => item.id.toString()}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.listContent}
                        renderItem={({ item }) => (
                            <MusicListItem
                                music={item}
                                selected={selectedId === item.id}
                                onPress={() => handleMusicPress(item)}
                                onSelect={() =>
                                    setSelectedId((prev) => (prev === item.id ? null : item.id))
                                }
                                hideAlbumCover={true}
                            />
                        )}
                    />
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backButton: {
        paddingRight: 8,
    },
    header: {
        alignItems: "center",
        paddingHorizontal: 32,
        paddingTop: 24,
        paddingBottom: 20,
    },
    cover: {
        width: 200,
        height: 200,
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
    },
    coverImage: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
    discIcon: {
        opacity: 0.85,
    },
    glossy: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(255,255,255,0.05)",
    },
    albumName: {
        marginTop: 18,
        textAlign: "center",
    },
    artistName: {
        marginTop: 6,
        textAlign: "center",
    },
    list: {
        flex: 1,
    },
    listContent: {
        paddingBottom: 140,
    },
});
