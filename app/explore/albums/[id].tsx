import { Ionicons } from "@expo/vector-icons";
import { Album } from "@models/album";
import { AlbumsApi, useAppFont, useAppTheme } from "@services";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MusicScreen } from "../../../src/screens/explore/MusicScreen";

type Params = {
    id: string;
    nombre?: string;
};

export default function AlbumDetailPage() {
    const { id, nombre } = useLocalSearchParams<Params>();
    const { theme } = useAppTheme();
    const { fontFamilyBold, fontFamilyRegular } = useAppFont();
    const [album, setAlbum] = useState<Album | null>(null);

    useEffect(() => {
        AlbumsApi.getById(Number(id)).then((data) => {
            if (data) setAlbum(data);
        });
    }, [id]);

    const artistNames = album
        ? [...new Set(album.musics.map((m) => m.artist.name))].join(", ") ||
          album.artist.name
        : "";

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
                        <View
                            style={[
                                styles.cover,
                                { backgroundColor: album.coverColor ?? theme.primary.main },
                            ]}
                        >
                            <Ionicons
                                name="disc"
                                size={88}
                                color="#ffffff"
                                style={styles.discIcon}
                            />
                            <View style={styles.glossy} />
                        </View>
                        <Text
                            style={[
                                styles.albumName,
                                { color: theme.text.primary, fontFamily: fontFamilyBold },
                            ]}
                            numberOfLines={2}
                        >
                            {album.name}
                        </Text>
                        <Text
                            style={[
                                styles.artistName,
                                { color: theme.text.secondary, fontFamily: fontFamilyRegular },
                            ]}
                            numberOfLines={1}
                        >
                            {artistNames}
                        </Text>
                    </>
                ) : (
                    <View
                        style={[styles.cover, { backgroundColor: theme.background.paper }]}
                    />
                )}
            </View>

            {/* Music list */}
            <View style={styles.list}>
                <MusicScreen albumId={Number(id)} showSearch={false} />
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
        fontSize: 20,
        marginTop: 18,
        textAlign: "center",
    },
    artistName: {
        fontSize: 14,
        marginTop: 6,
        textAlign: "center",
    },
    list: {
        flex: 1,
    },
});
