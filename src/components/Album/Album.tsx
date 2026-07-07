import { Ionicons } from "@expo/vector-icons";
import { Album as AlbumType } from "@models/album";
import { router } from "expo-router";
import { Pressable, View } from "react-native";
import { Typography } from "@components";
import { styles } from "./estilos";

export type AlbumProps = {
    album: AlbumType;
    width?: number | string;
};

export function Album({ album, width = "48%" }: AlbumProps) {
    const handleRoute = () => {
        router.push({
            pathname: `/explore/albums/[id]`,
            params: {
                id: album.id,
                nombre: album.name,
            }
        });
    };

    return (
        <Pressable
            style={({ pressed }) => [
                { width: width as any },
                pressed && { opacity: 0.9, transform: [{ scale: 0.98 }] }
            ]}
            onPress={handleRoute}
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
                <Typography variant="body" weight="bold" color="white" numberOfLines={1}>
                    {album.name}
                </Typography>
                <Typography variant="caption" color="secondary" numberOfLines={1}>
                    {album.artist.name}
                </Typography>
            </View>
        </Pressable>
    );
}
