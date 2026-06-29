import { MusicListItem, MusicPlaceholder, SearchInput } from "@components";
import { Music } from "@models/music";
import { MusicFilters, MusicsApi, useAppFont, useAppTheme } from "@services";
import { router } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

type TProps = {
    genreId?: number;
    albumId?: number;
    artistId?: number;
};

const PLACEHOLDER_COUNT = 5;

export default function MusicScreen({ genreId, albumId, artistId }: TProps) {
    const { theme } = useAppTheme();
    const { fontFamilyRegular } = useAppFont();
    const [musics, setMusics] = useState<Music[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [selectedId, setSelectedId] = useState<number | null>(null);

    useEffect(() => {
        const filters: MusicFilters = {};
        if (genreId)  filters.genreId = genreId;
        if (albumId)  filters.albumId = albumId;
        if (artistId) filters.artistId = artistId;

        MusicsApi.getFiltered(Object.keys(filters).length ? filters : undefined)
            .then((data) => {
                setMusics(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [genreId, albumId, artistId]);

    const filtered = useMemo(() => {
        if (!search.trim()) return musics;
        const q = search.toLowerCase();
        return musics.filter(
            (m) =>
                m.name.toLowerCase().includes(q) ||
                m.artist.name.toLowerCase().includes(q)
        );
    }, [musics, search]);

    const handleMusicPress = (music: Music) => {
        router.push({
            pathname: "/explore/music/[id]",
            params: { id: music.id, musicName: music.name },
        });
    };

    if (loading) {
        return (
            <View style={styles.container}>
                <SearchInput value="" onChangeText={() => {}} placeholder="Buscar música..." />
                <FlatList
                    data={Array.from({ length: PLACEHOLDER_COUNT }, (_, i) => i)}
                    keyExtractor={(i) => i.toString()}
                    showsVerticalScrollIndicator={false}
                    renderItem={() => <MusicPlaceholder />}
                />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <SearchInput
                value={search}
                onChangeText={setSearch}
                placeholder="Buscar música..."
            />
            <FlatList
                data={filtered}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <Text style={[styles.empty, { fontFamily: fontFamilyRegular, color: theme.text.secondary }]}>
                        Sin resultados para "{search}"
                    </Text>
                }
                renderItem={({ item }) => (
                    <MusicListItem
                        music={item}
                        selected={selectedId === item.id}
                        onPress={() => handleMusicPress(item)}
                        onSelect={() =>
                            setSelectedId((prev) =>
                                prev === item.id ? null : item.id
                            )
                        }
                    />
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    empty: {
        textAlign: "center",
        marginTop: 40,
        fontSize: 14,
    },
});
