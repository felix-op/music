import { useEffect, useRef } from "react";
import { Animated, View } from "react-native";
import { styles } from "./estilos";
import { useAppTheme } from "@services";

export function MusicPlaceholder() {
    const pulseAnim = useRef(new Animated.Value(0.4)).current;
    const { theme } = useAppTheme();

    useEffect(() => {
        const pulse = Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, { toValue: 0.85, duration: 1200, useNativeDriver: true }),
                Animated.timing(pulseAnim, { toValue: 0.4, duration: 1200, useNativeDriver: true }),
            ])
        );
        pulse.start();
        return () => pulse.stop();
    }, [pulseAnim]);

    return (
        <View style={styles.row}>
            <Animated.View style={[styles.circle, { opacity: pulseAnim, borderRadius: theme.shape.borderRadius / 1.5 }]} />
            <View style={styles.infoCol}>
                <Animated.View style={[styles.titleLine, { opacity: pulseAnim }]} />
                <Animated.View style={[styles.subtitleLine, { opacity: pulseAnim }]} />
            </View>
            <Animated.View style={[styles.durationLine, { opacity: pulseAnim }]} />
        </View>
    );
}
