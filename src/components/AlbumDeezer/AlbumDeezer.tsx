import { Ionicons } from "@expo/vector-icons";
import { AlbumDezzerModel } from "@models/albumDezzer";
import { useAppFont } from "@services";
import { Image, Pressable, Text, View } from "react-native";
import { styles } from "./estilos";

export type AlbumDeezerProps = {
    album: AlbumDezzerModel;
    width?: number | string;
    onPress?: () => void;
};

export function AlbumDeezer({ album, width = 140, onPress }: AlbumDeezerProps) {
    const { fontFamilyBold, fontFamilyRegular } = useAppFont();
    const coverUrl = album.cover_medium ?? album.cover_big ?? album.cover ?? null;

    return (
        <Pressable
            style={({ pressed }) => [
                { width: width as any },
                pressed && { opacity: 0.9, transform: [{ scale: 0.98 }] },
            ]}
            onPress={onPress}
        >
            <View style={styles.coverContainer}>
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
                <Text
                    style={[styles.albumTitle, { fontFamily: fontFamilyBold }]}
                    numberOfLines={1}
                >
                    {album.title}
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
