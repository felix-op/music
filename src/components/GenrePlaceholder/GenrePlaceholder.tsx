import React, { useEffect, useRef } from "react";
import { Animated, FlatList, View } from "react-native";
import { styles } from "./estilos";

type TProps = {
    renderItem: (index: number) => React.ReactElement | null;
    itemCount?: number;
};

export function GenrePlaceholder({ renderItem, itemCount = 4 }: TProps) {
    const pulseAnim = useRef(new Animated.Value(0.4)).current;

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

    const mockData = Array.from({ length: itemCount }, (_, i) => i);

    return (
        <View style={styles.genreSection}>
            {/* Genre Header Placeholder */}
            <View style={styles.genreHeader}>
                <Animated.View style={[styles.genreTitlePlaceholder, { opacity: pulseAnim }]} />
            </View>

            {/* Horizontal Scroll with Custom Child Placeholders */}
            <FlatList
                horizontal
                data={mockData}
                keyExtractor={(item) => item.toString()}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.horizontalListContainer}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                renderItem={({ item }) => renderItem(item)}
            />
        </View>
    );
}
