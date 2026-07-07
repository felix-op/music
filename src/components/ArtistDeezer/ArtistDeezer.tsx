import { Ionicons } from "@expo/vector-icons";
import { ArtistDezzerModel } from "@models/artistDezzer";
import { Image, Pressable, View } from "react-native";
import { Typography } from "@components";
import { styles } from "./estilos";

export type ArtistDeezerProps = {
    artist: ArtistDezzerModel;
    width?: number;
    onPress?: () => void;
};

export function ArtistDeezer({ artist, width = 110, onPress }: ArtistDeezerProps) {
    const pictureUrl = artist.picture_medium ?? artist.picture_big ?? artist.picture ?? null;

    return (
        <Pressable
            style={({ pressed }) => [
                styles.container,
                { width },
                pressed && { opacity: 0.8, transform: [{ scale: 0.96 }] },
            ]}
            onPress={onPress}
        >
            <View style={[styles.avatarContainer, { width: width, height: width, borderRadius: width / 2 }]}>
                {pictureUrl ? (
                    <Image
                        source={{ uri: pictureUrl }}
                        style={styles.avatarImage}
                        resizeMode="cover"
                    />
                ) : (
                    <View style={styles.avatarFallback}>
                        <Ionicons name="person" size={width * 0.45} color="#8B5CF6" />
                    </View>
                )}
                <View style={styles.glossyOverlay} />
            </View>

            <View style={styles.infoArea}>
                <Typography variant="bodySmall" weight="bold" color="white" numberOfLines={2}>
                    {artist.name}
                </Typography>
            </View>
        </Pressable>
    );
}
