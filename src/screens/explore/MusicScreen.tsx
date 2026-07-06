import { MusicListItem, MusicPlaceholder, SearchInput } from "@components";
import { MusicDezzerModel } from "@models/musicDezzer";
import { useAppFont, useAppTheme } from "@services";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useGetMusics } from "../../hooks/useGetMusics";
import { useGetSearchMusics } from "../../hooks/useGetSearchMusics";

type TProps = {
    albumId?: number;
    showSearch?: boolean;
};

const PLACEHOLDER_COUNT = 5;

export function MusicScreen({ albumId, showSearch = true }: TProps) {
    const { theme } = useAppTheme();
    const { fontFamilyRegular } = useAppFont();
    const [search, setSearch] = useState("");
    const [selectedId, setSelectedId] = useState<number | null>(null);

    const isSearching = search.trim().length > 0;

    const { data: browseData, isLoading: isBrowseLoading } = useGetMusics({ enabled: !isSearching });
    const { data: searchData, isLoading: isSearchLoading } = useGetSearchMusics(search, { enabled: isSearching });

    const musics = isSearching ? searchData ?? [] : browseData ?? [];
    const loading = isSearching ? isSearchLoading : isBrowseLoading;

    const filtered = useMemo(() => {
        if (!albumId) return musics;
        return musics.filter((m) => m.album.id === albumId);
    }, [musics, albumId]);

    const handleMusicPress = (music: MusicDezzerModel) => {
        router.push({
            pathname: "/explore/music/[id]",
            params: { id: music.id, musicName: music.title },
        });
    };

    if (loading) {
        return (
            <View style={styles.container}>
                {showSearch && <SearchInput value={search} onChangeText={setSearch} placeholder="Buscar música..." />}
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
            {showSearch && (
                <SearchInput
                    value={search}
                    onChangeText={setSearch}
                    placeholder="Buscar música..."
                />
            )}
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
