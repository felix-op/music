import { Typography } from "@components";
import { Ionicons } from "@expo/vector-icons";
import { MusicDezzerModel } from "@models/musicDezzer";
import { useAppTheme } from "@services";
import { useRef, useState } from "react";
import {
    Animated, Image, PanResponder,
    Pressable,
    View,
    useWindowDimensions
} from "react-native";
import usePlayList from "../../hooks/usePlayList";
import { ARROW_WIDTH, styles } from "./estilos";

type TProps = {
    music: MusicDezzerModel;
    selected: boolean;
    onPress: () => void;
    onSelect: () => void;
    hideAlbumCover?: boolean;
};

const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
};

export function MusicListItem({ music, onPress, onSelect, hideAlbumCover = false }: TProps) {
    const { currentSong, play } = usePlayList();
    const { theme } = useAppTheme();
    const { width: screenWidth } = useWindowDimensions();
    const [containerWidth, setContainerWidth] = useState(screenWidth);
    const selected = Number(currentSong?.id || 0) === music.id;

    const translateX = useRef(new Animated.Value(0)).current;
    const isOpen = useRef(false);

    const iconColor = theme.primary.main;

    const snapTo = (toValue: number, onDone?: () => void) => {
        isOpen.current = toValue !== 0;
        Animated.spring(translateX, {
            toValue,
            useNativeDriver: true,
            tension: 120,
            friction: 12,
        }).start(() => onDone?.());
    };

    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: (_, { dx, dy }) =>
                Math.abs(dx) > 5 && Math.abs(dx) > Math.abs(dy),
            onPanResponderMove: (_, { dx }) => {
                const base = isOpen.current ? -ARROW_WIDTH : 0;
                const next = Math.min(Math.max(base + dx, -ARROW_WIDTH), 0);
                translateX.setValue(next);
            },
            onPanResponderRelease: (_, { dx }) => {
                const base = isOpen.current ? -ARROW_WIDTH : 0;
                const final = base + dx;
                if (final < -ARROW_WIDTH / 2) {
                    snapTo(0, onPress);
                } else {
                    snapTo(0);
                }
            },
            onPanResponderTerminate: () => {
                snapTo(isOpen.current ? -ARROW_WIDTH : 0);
            },
        })
    ).current;

    const handlePress = () => {
        if (isOpen.current) {
            snapTo(0);
        } else {
            play({ 
                source: "deezer", 
                id: music.id.toString(), 
                title: music.title,
                artist: music.artist.name, 
                duration: music.duration,
                coverUrl: music.album?.cover_small 
            });
            //onSelect();
        }
    };

    return (
        <View
            onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
            style={[styles.container, { borderBottomColor: theme.divider }]}
        >
            <Animated.View
                {...panResponder.panHandlers}
                style={[styles.slider, { transform: [{ translateX }] }]}
            >
                <Pressable
                    onPress={handlePress}
style={[
                        styles.row,
                        { width: containerWidth },
                        selected && {
                            backgroundColor: theme.primary.main + "33",
                        },
                    ]}
                >
                    {!hideAlbumCover && (
                        <View style={styles.iconWrapper}>
                            <View
                                style={[
                                    styles.iconCircle,
                                    { backgroundColor: iconColor },
                                ]}
                            >
                                {music.album?.cover_small ? (
                                    <Image
                                        source={{ uri: music.album.cover_small }}
                                        style={styles.coverImage}
                                    />
                                ) : (
                                    <Ionicons
                                        name="musical-note"
                                        size={22}
                                        color="#ffffff"
                                    />
                                )}
                                <View style={styles.glossy} />
                            </View>
                            <View style={styles.playOverlay}>
                                <Ionicons
                                    name="play"
                                    size={13}
                                    color={theme.text.primary}
                                />
                            </View>
                        </View>
                    )}

                    <View style={styles.infoCol}>
                        <Typography
                            variant="body"
                            weight="bold"
                            numberOfLines={1}
                        >
                            {music.title}
                        </Typography>
                        <Typography
                            variant="caption"
                            color="secondary"
                            numberOfLines={1}
                        >
                            {music.artist.name}
                        </Typography>
                    </View>

                    <Typography
                        variant="caption"
                        color="secondary"
                    >
                        {formatDuration(music.duration)}
                    </Typography>
                </Pressable>

                <View
                    style={[
                        styles.arrowButton,
                        { backgroundColor: theme.primary.main },
                    ]}
                >
                    <Ionicons
                        name="chevron-forward"
                        size={24}
                        color="#ffffff"
                    />
                </View>
            </Animated.View>
        </View>
    );
}
