import { Ionicons } from "@expo/vector-icons";
import { Album as AlbumCard, AlbumPlaceholder } from "@components";
import { Album } from "@models/album";
import { AlbumsApi, useAppFont, useAppTheme } from "@services";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { ReactNode, useEffect, useRef, useState } from "react";
import {
    Animated,
    FlatList,
    Pressable,
    StyleSheet,
    Text,
    View,
    useWindowDimensions,
} from "react-native";

type Params = {
    genre: string;
    genreName?: string;
};

function FadeInItem({ children, delay }: { children: ReactNode; delay: number }) {
    const opacity = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(24)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(opacity, {
                toValue: 1,
                duration: 380,
                delay,
                useNativeDriver: true,
            }),
            Animated.timing(translateY, {
                toValue: 0,
                duration: 380,
                delay,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    return (
        <Animated.View style={[styles.itemWrapper, { opacity, transform: [{ translateY }] }]}>
            {children}
        </Animated.View>
    );
}

export default function GenreAlbumsPage() {
    const { genre: genreId, genreName } = useLocalSearchParams<Params>();
    const { fontFamilyRegular } = useAppFont();
    const { theme } = useAppTheme();
    const { width: screenWidth } = useWindowDimensions();
    const [albums, setAlbums] = useState<Album[]>([]);
    const [loading, setLoading] = useState(true);

    // 16px padding each side + 16px gap between columns
    const albumWidth = Math.floor((screenWidth - 48) / 2);
    const pageTitle = genreName ? `Álbumes de ${genreName}` : "Álbumes";

    useEffect(() => {
        AlbumsApi.getByGenreId(Number(genreId))
            .then((data) => {
                setAlbums(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [genreId]);

    return (
        <View style={styles.container}>
            <Stack.Screen
                options={{
                    headerShown: true,
                    title: pageTitle,
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

            {loading ? (
                <FlatList
                    data={[1, 2, 3, 4]}
                    keyExtractor={(i) => i.toString()}
                    numColumns={2}
                    columnWrapperStyle={styles.columnWrapper}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    renderItem={() => (
                        <View style={styles.itemWrapper}>
                            <AlbumPlaceholder width={albumWidth} />
                        </View>
                    )}
                />
            ) : albums.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Ionicons name="disc-outline" size={56} color={theme.text.disabled} />
                    <Text
                        style={[
                            styles.emptyText,
                            { fontFamily: fontFamilyRegular, color: theme.text.secondary },
                        ]}
                    >
                        Sin álbumes en este género
                    </Text>
                </View>
            ) : (
                <FlatList
                    data={albums}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={2}
                    columnWrapperStyle={styles.columnWrapper}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                        <FadeInItem delay={Math.min(index, 9) * 75}>
                            <AlbumCard album={item} width={albumWidth} />
                        </FadeInItem>
                    )}
                />
            )}
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
    emptyContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
    },
    emptyText: {
        fontSize: 15,
    },
    listContent: {
        padding: 16,
        paddingBottom: 32,
        gap: 20,
    },
    columnWrapper: {
        gap: 16,
    },
    itemWrapper: {
        flex: 1,
    },
});
