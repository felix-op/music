import { Ionicons } from "@expo/vector-icons";
import { useAppTheme } from "@services";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import usePlayList from "../../hooks/usePlayList";
import { Typography } from "../Typography/Typography";

export function MiniPlayer() {
    const { currentSong, isPlaying, play, pause, resume, next, prev, isPlayerLoading, positionMillis, durationMillis } = usePlayList();
    const { theme } = useAppTheme();

    if (isPlayerLoading || !currentSong) {
        return null;
    }

    const formatTime = (millis: number) => {
        if (!millis || isNaN(millis)) return "00:00";
        const totalSeconds = Math.floor(millis / 1000);
        const m = Math.floor(totalSeconds / 60);
        const s = totalSeconds % 60;
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    const handlePlayPause = () => {
        if (isPlaying) {
            pause();
        } else {
            resume();
        }
    };

    const progressPercent = durationMillis > 0 ? (positionMillis / durationMillis) * 100 : 0;

    return (
        <View style={[styles.container, { backgroundColor: theme.background.paper, borderRadius: theme.shape.borderRadius }]}>
            <View style={styles.leftSection}>
                {currentSong.coverUrl ? (
                    <Image source={{ uri: currentSong.coverUrl }} style={[styles.cover, { borderRadius: (theme.shape.borderRadius) / 1.5 }]} />
                ) : (
                    <View style={[styles.placeholderCover, { borderRadius: theme.shape.borderRadius / 1.5 }]}>
                        <Ionicons name="musical-notes" size={20} color="#fff" />
                    </View>
                )}
                <View style={styles.info}>
                    <Typography variant="body" weight="bold" color="white" numberOfLines={1}>
                        {currentSong.title || "Canción Desconocida"}
                    </Typography>
                    <View style={styles.timeRow}>
                        <Typography variant="caption" color="secondary">
                            {formatTime(positionMillis)} / {formatTime(durationMillis)}
                        </Typography>
                    </View>
                </View>
            </View>

            <View style={styles.controls}>
                <TouchableOpacity onPress={prev} style={styles.controlBtn}>
                    <Ionicons name="play-skip-back" size={24} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity onPress={handlePlayPause} style={styles.controlBtn}>
                    <Ionicons name={isPlaying ? "pause" : "play"} size={28} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity onPress={next} style={styles.controlBtn}>
                    <Ionicons name="play-skip-forward" size={24} color="#fff" />
                </TouchableOpacity>
            </View>
            
            {/* Progress Bar */}
            <View style={styles.progressContainer}>
                <View style={[styles.progressBar, { backgroundColor: theme.primary.main, width: `${progressPercent}%` }]} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#2C2C2E",
        padding: 8,
        // Shadow for better float effect
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 5,
    },
    leftSection: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },
    cover: {
        width: 44,
        height: 44,
        borderRadius: 8,
    },
    placeholderCover: {
        width: 44,
        height: 44,
        borderRadius: 8,
        backgroundColor: "#48484A",
        alignItems: "center",
        justifyContent: "center",
    },
    info: {
        flex: 1,
        justifyContent: "center",
        gap: 2,
    },
    timeRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    controls: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    controlBtn: {
        padding: 4,
    },
    progressContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 2,
        backgroundColor: '#48484A',
        overflow: 'hidden',
    },
    progressBar: {
        height: '100%',
    }
});
