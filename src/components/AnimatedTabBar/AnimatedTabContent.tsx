import { TabItem } from "@models";
import { useEffect, useRef } from "react";
import { Animated, StyleSheet } from "react-native";

interface AnimatedTabContentProps {
    tabs: TabItem[];
    activeTabKey: string;
}

export function AnimatedTabContent({ tabs, activeTabKey }: AnimatedTabContentProps) {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const translateXAnim = useRef(new Animated.Value(12)).current;

    const ActiveScreen = tabs.find(tab => tab.id === activeTabKey)?.component;

    useEffect(() => {
        fadeAnim.setValue(0);
        translateXAnim.setValue(12);

        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 250,
                useNativeDriver: true,
            }),
            Animated.timing(translateXAnim, {
                toValue: 0,
                duration: 250,
                useNativeDriver: true,
            }),
        ]).start();
    }, [activeTabKey, fadeAnim, translateXAnim]);

    return (
        <Animated.View
            style={[
                styles.container,
                {
                    opacity: fadeAnim,
                    transform: [{ translateX: translateXAnim }],
                },
            ]}
        >
            {ActiveScreen ? <ActiveScreen /> : null}
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});