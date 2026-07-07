import { ArtistDeezer, ArtistPlaceholder } from "@components";
import { Ionicons } from "@expo/vector-icons";
import { useAppFont, useAppTheme } from "@services";
import { router } from "expo-router";
import { ReactNode, useEffect, useRef } from "react";
import {
    ActivityIndicator,
    Animated,
    FlatList,
    StyleSheet,
    useWindowDimensions,
    View,
} from "react-native";
import { Typography } from "@components";
import { useGetTopArtists } from "../../hooks/useGetTopArtists";

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

export default function ArtistsScreen() {
    const { fontFamilyRegular } = useAppFont();
    const { theme } = useAppTheme();
    const { width: screenWidth } = useWindowDimensions();
    const {
        data: artists,
        isLoading,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
    } = useGetTopArtists();

    // 16px padding each side + 16px gap between columns (2 gaps for 3 cols)
    const artistWidth = Math.floor((screenWidth - 32 - 32) / 3);

    const handleEndReached = () => {
        if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    };

    if (isLoading) {
        return (
            <FlatList
                data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
                keyExtractor={(i) => i.toString()}
                numColumns={3}
                columnWrapperStyle={styles.columnWrapper}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                renderItem={() => (
                    <View style={styles.itemWrapper}>
                        <ArtistPlaceholder width={artistWidth} />
                    </View>
                )}
            />
        );
    }

    if (artists.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <Ionicons name="people-outline" size={56} color={theme.text.disabled} />
                <Typography
                    variant="body"
                    color="secondary"
                    style={styles.emptyText}
                >
                    No se encontraron artistas
                </Typography>
            </View>
        );
    }

    return (
        <FlatList
            data={artists}
            keyExtractor={(item) => item.id.toString()}
            numColumns={3}
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
                    <ArtistDeezer
                        artist={item}
                        width={artistWidth}
                        onPress={() =>
                            router.push({
                                pathname: "/explore/artists/albums/[artistId]",
                                params: { artistId: item.id, artistName: item.name },
                            })
                        }
                    />
                </FadeInItem>
            )}
        />
    );
}

const styles = StyleSheet.create({
    emptyContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
        marginTop: 64,
    },
    emptyText: {
        textAlign: "center",
    },
    listContent: {
        paddingTop: 12,
        paddingBottom: 32,
        gap: 24,
    },
    columnWrapper: {
        gap: 16,
        justifyContent: "flex-start",
    },
    itemWrapper: {
        flex: 1,
        alignItems: "center",
    },
});
