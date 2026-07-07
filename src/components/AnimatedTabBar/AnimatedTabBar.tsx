import { TabItem } from "@models";
import { useAppFont, useAppTheme } from "@services";
import { useEffect, useRef } from "react";
import { Animated, Pressable, View, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Typography } from "@components";
import { styles } from "./estilos";

interface AnimatedTabBarProps {
    tabs: TabItem[];
    activeTab: string;
    onTabChange: (tabId: string) => void;
}

export function AnimatedTabBar({ tabs, activeTab, onTabChange }: AnimatedTabBarProps) {
    const { left, right } = useSafeAreaInsets();
    const { width: windowWidth } = useWindowDimensions();
    const { theme } = useAppTheme();

    const containerWidth = windowWidth - (left + right + 20);
    const tabWidth = (containerWidth - 8) / tabs.length;

    const slideAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const activeIndex = tabs.findIndex(tab => tab.id === activeTab);
        const index = activeIndex >= 0 ? activeIndex : 0;
        
        Animated.spring(slideAnim, {
            toValue: index * tabWidth,
            useNativeDriver: true,
            tension: 80,
            friction: 10,
        }).start();
    }, [activeTab, tabWidth, tabs]);

    return (
        <View style={[styles.chipRow, { borderRadius: theme.shape.borderRadius }]}>
            <Animated.View
                style={[
                    styles.activeCapsule,
                    {
                        width: tabWidth,
                        transform: [{ translateX: slideAnim }],
                        borderRadius: theme.shape.borderRadius > 4 ? theme.shape.borderRadius - 4 : 0,
                    },
                ]}
            />

            {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                    <Pressable
                        key={tab.id}
                        style={styles.tabButton}
                        onPress={() => onTabChange(tab.id)}
                    >
                        <Typography
                            variant="body"
                            weight={isActive ? "bold" : "regular"}
                            color={isActive ? "white" : "secondary"}
                        >
                            {tab.label}
                        </Typography>
                    </Pressable>
                );
            })}
        </View>
    );
}

