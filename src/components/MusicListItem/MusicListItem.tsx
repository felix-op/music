import { Ionicons } from "@expo/vector-icons";
import { MusicDezzerModel } from "@models/musicDezzer";
import { useAppFont, useAppTheme } from "@services";
import { useRef, useState } from "react";
import { Image } from "react-native";
import {
    Animated,
    PanResponder,
    Pressable,
    Text,
    View,
    useWindowDimensions,
} from "react-native";
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

export function MusicListItem({ music, selected, onPress, onSelect, hideAlbumCover = false }: TProps) {
    const { theme } = useAppTheme();
    const { fontFamilyBold, fontFamilyRegular } = useAppFont();
    const { width: screenWidth } = useWindowDimensions();
    const [containerWidth, setContainerWidth] = useState(screenWidth);

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
            onSelect();
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
                        <Text
                            style={[
                                styles.title,
                                {
                                    fontFamily: fontFamilyBold,
                                    color: theme.text.primary,
                                },
                            ]}
                            numberOfLines={1}
                        >
                            {music.title}
                        </Text>
                        <Text
                            style={[
                                styles.subtitle,
                                {
                                    fontFamily: fontFamilyRegular,
                                    color: theme.text.secondary,
                                },
                            ]}
                            numberOfLines={1}
                        >
                            {music.artist.name}
                        </Text>
                    </View>

                    <Text
                        style={[
                            styles.duration,
                            {
                                fontFamily: fontFamilyRegular,
                                color: theme.text.secondary,
                            },
                        ]}
                    >
                        {formatDuration(music.duration)}
                    </Text>
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
