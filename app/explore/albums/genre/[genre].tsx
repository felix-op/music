import { Ionicons } from "@expo/vector-icons";
import { AlbumPlaceholder, AlbumDeezer } from "@components";
import { useAppFont, useAppTheme } from "@services";
import { useGetAlbumsByGenre } from "../../../../src/hooks/useGetAlbumsByGenre";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { ReactNode, useEffect, useRef } from "react";
import {
    ActivityIndicator,
    Animated,
    FlatList,
    Pressable,
    StyleSheet,
    View,
    useWindowDimensions,
} from "react-native";
import { Typography } from "@components";

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
    const { theme } = useAppTheme();
    const { width: screenWidth } = useWindowDimensions();
    const {
        data: albums,
        isLoading,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
    } = useGetAlbumsByGenre(Number(genreId));

    // 16px padding each side + 16px gap between columns
    const albumWidth = Math.floor((screenWidth - 48) / 2);
    const pageTitle = genreName ? `Álbumes de ${genreName}` : "Álbumes";

    const handleEndReached = () => {
        if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    };

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

            {isLoading ? (
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
                    <Typography
                        variant="body"
                        color="secondary"
                        style={styles.emptyText}
                    >
                        Sin álbumes en este género
                    </Typography>
                </View>
            ) : (
                <FlatList
                    data={albums}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={2}
                    columnWrapperStyle={styles.columnWrapper}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    onEndReached={handleEndReached}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={
                        isFetchingNextPage ? (
                            <ActivityIndicator color={theme.primary.main} style={{ marginVertical: 16 }} />
                        ) : null
                    }
                    renderItem={({ item, index }) => (
                        <FadeInItem delay={Math.min(index, 9) * 75}>
                            <AlbumDeezer 
                                album={item} 
                                width={albumWidth} 
                                onPress={() => 
                                    router.push({
                                        pathname: "/explore/albums/[id]",
                                        params: { id: item.id, nombre: item.title }
                                    })
                                }
                            />
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
    emptyText: {},
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
