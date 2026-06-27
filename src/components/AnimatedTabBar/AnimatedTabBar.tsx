import { TabItem } from "@models";
import { useAppFont } from "@services";
import { useEffect, useRef } from "react";
import { Animated, Pressable, Text, View, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { styles } from "./estilos";

interface AnimatedTabBarProps {
    tabs: TabItem[];
    activeTab: string;
    onTabChange: (tabId: string) => void;
}

export function AnimatedTabBar({ tabs, activeTab, onTabChange }: AnimatedTabBarProps) {
    const { fontFamilyBold, fontFamilyRegular } = useAppFont();
    const { left, right } = useSafeAreaInsets();
    const { width: windowWidth } = useWindowDimensions();

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
        <View style={styles.chipRow}>
            <Animated.View
                style={[
                    styles.activeCapsule,
                    {
                        width: tabWidth,
                        transform: [{ translateX: slideAnim }],
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
                        <Text
                            style={[
                                styles.tabText,
                                { fontFamily: isActive ? fontFamilyBold : fontFamilyRegular },
                                isActive ? styles.tabTextActive : styles.tabTextInactive,
                            ]}
                        >
                            {tab.label}
                        </Text>
                    </Pressable>
                );
            })}
        </View>
    );
}

