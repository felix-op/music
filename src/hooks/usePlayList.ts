import { usePathname } from "expo-router";
import { useState } from "react";
import { playlistRoute } from "../services/rutas";

export default function usePlayList() {
    const pathname = usePathname();

    const isPlayListMode = playlistRoute
        ? pathname.startsWith(playlistRoute.href)
        : false;

    // estado de reproducción (mock)
    const [isPlaying, setIsPlaying] = useState(false);

    // 🔘 handlers (por ahora vacíos)
    const handlePrevious = () => {
        console.log("previous");
    };

    const handleRewind = () => {
        console.log("rewind");
    };

    const handlePlayPause = () => {
        setIsPlaying((prev) => !prev);
    };

    const handleForward = () => {
        console.log("forward");
    };

    const handleNext = () => {
        console.log("next");
    };

    // 🎛️ botones de la playlist navbar
    const botones = [
        {
            id: "previous",
            icon: "play-skip-back",
            onPress: handlePrevious,
        },
        {
            id: "rewind",
            icon: "play-back",
            onPress: handleRewind,
        },
        {
            id: "playPause",
            icon: isPlaying ? "pause" : "play",
            onPress: handlePlayPause,
        },
        {
            id: "forward",
            icon: "play-forward",
            onPress: handleForward,
        },
        {
            id: "next",
            icon: "play-skip-forward",
            onPress: handleNext,
        },
    ];

    return {
        isPlayListMode,
        botones,
        isPlaying,
    };
}