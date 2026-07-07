import React, { useEffect, useRef } from "react";
import { Animated, View } from "react-native";
import { styles } from "./estilos";
import { useAppTheme } from "@services";

type TProps = {
    width?: number | string;
};

export function AlbumPlaceholder({ width = 140 }: TProps) {
    const pulseAnim = useRef(new Animated.Value(0.4)).current;
    const { theme } = useAppTheme();

    useEffect(() => {
        const pulse = Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 0.8,
                    duration: 1200,
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 0.4,
                    duration: 1200,
                    useNativeDriver: true,
                }),
            ])
        );
        pulse.start();
        return () => pulse.stop();
    }, [pulseAnim]);

    return (
        <View style={{ width: width as any }}>
            {/* Animated cover art container */}
            <Animated.View style={[styles.coverContainer, { opacity: pulseAnim, borderRadius: theme.shape.borderRadius / 1.5 }]} />

            {/* Text info */}
            <View style={styles.infoArea}>
                <Animated.View style={[styles.titleLine, { opacity: pulseAnim }]} />
                <Animated.View style={[styles.artistLine, { opacity: pulseAnim }]} />
                <View style={styles.metaRow}>
                    <Animated.View style={[styles.metaLine, { opacity: pulseAnim }]} />
                </View>
            </View>
        </View>
    );
}
