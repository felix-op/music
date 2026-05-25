import { Pressable, Text, View } from "react-native";
import { styles } from "./estilos";
import { Ionicons } from "@expo/vector-icons";
import { useAppFont } from "@services";
import { router } from "expo-router";
import { Album as AlbumType } from "@models/album";

export type AlbumProps = {
    album: AlbumType;
    width?: number | string;
};

export function Album({ album, width = "48%" }: AlbumProps) {
    const { fontFamilyBold, fontFamilyRegular } = useAppFont();

    return (
        <Pressable
            style={({ pressed }) => [
                { width: width as any },
                pressed && { opacity: 0.9, transform: [{ scale: 0.98 }] }
            ]}
            onPress={() => router.push(`/explore/albums/${album.id}` as any)}
        >
            {/* Cover art container */}
            <View style={[styles.coverContainer, { backgroundColor: album.coverColor ?? "#8B5CF6" }]}>
                {/* Inner glow disc icon */}
                <Ionicons name="disc" size={48} color="#ffffff" style={styles.discIcon} />
                {/* Subtle glossy overlay */}
                <View style={styles.glossyOverlay} />
            </View>

            {/* Text info */}
            <View style={styles.infoArea}>
                <Text
                    style={[styles.albumTitle, { fontFamily: fontFamilyBold }]}
                    numberOfLines={1}
                >
                    {album.name}
                </Text>
                <Text
                    style={[styles.albumArtist, { fontFamily: fontFamilyRegular }]}
                    numberOfLines={1}
                >
                    {album.artist.name}
                </Text>
            </View>
        </Pressable>
    );
}
