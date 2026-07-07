import React, { useEffect, useRef } from "react";
import { Animated, View } from "react-native";
import { styles } from "./estilos";

export function ArtistPlaceholder({ width = 110 }: { width?: number }) {
    const pulseAnim = useRef(new Animated.Value(0.4)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 0.8,
                    duration: 800,
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 0.4,
                    duration: 800,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, []);

    return (
        <View style={[styles.container, { width }]}>
            <View style={[styles.avatarContainer, { width: width, height: width, borderRadius: width / 2 }]}>
                <Animated.View style={[styles.shimmerContainer, { opacity: pulseAnim }]} />
            </View>
            <View style={styles.infoArea}>
                <Animated.View style={[styles.placeholderText, { width: width * 0.7, opacity: pulseAnim }]} />
            </View>
        </View>
    );
}
