import { Typography } from "@components";
import { Ionicons } from "@expo/vector-icons";
import { AlbumDezzerModel } from "@models/albumDezzer";
import { useAppTheme } from "@services";
import { Image, Pressable, View } from "react-native";
import { styles } from "./estilos";

export type AlbumDeezerProps = {
    album: AlbumDezzerModel;
    width?: number | string;
    onPress?: () => void;
};

export function AlbumDeezer({ album, width = 140, onPress }: AlbumDeezerProps) {
    const { theme } = useAppTheme();
    const coverUrl = album.cover_medium ?? album.cover_big ?? album.cover ?? null;

    return (
        <Pressable
            style={({ pressed }) => [
                { width: width as any },
                pressed && { opacity: 0.9, transform: [{ scale: 0.98 }] },
            ]}
            onPress={onPress}
        >
            <View style={[styles.coverContainer, { borderRadius: theme.shape.borderRadius }]}>
                {coverUrl ? (
                    <Image
                        source={{ uri: coverUrl }}
                        style={styles.coverImage}
                        resizeMode="cover"
                    />
                ) : (
                    <View style={styles.coverFallback}>
                        <Ionicons name="disc" size={48} color="#8B5CF6" />
                    </View>
                )}
                <View style={styles.glossyOverlay} />
            </View>

            <View style={styles.infoArea}>
                <Typography variant="body" weight="bold" color="white" numberOfLines={1}>
                    {album.title}
                </Typography>
                <Typography variant="caption" color="secondary" numberOfLines={1}>
                    {album.artist?.name ?? ""}
                </Typography>
            </View>
        </Pressable>
    );
}
