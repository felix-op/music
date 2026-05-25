import React, { useState, useEffect, useRef } from "react";
import { Animated, Dimensions, Pressable, StyleSheet, Text, View, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Header } from "@components";
import { useAppFont } from "@services";
import AlbumsScreen from "../../src/screens/explore/AlbumsScreen";
import ArtistsScreen from "../../src/screens/explore/ArtistsScreen";
import MusicsScreen from "../../src/screens/explore/MusicsScreen";

type TabType = "albums" | "artists" | "musics";

export default function ExplorePage() {
    const { fontFamilyBold, fontFamilyRegular } = useAppFont();
    const { left, right } = useSafeAreaInsets();
    const { width: windowWidth } = useWindowDimensions();

    // Constant deterministic width calculations to prevent layout latency/flicker
    const containerWidth = windowWidth - (left + right + 20); // Width minus stack parent content padding
    const tabWidth = (containerWidth - 8) / 3; // Width of a single tab (accounting for 4px padding on each side)

    const [activeTab, setActiveTab] = useState<TabType>("albums");

    // Animation values
    const slideAnim = useRef(new Animated.Value(0)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const translateXAnim = useRef(new Animated.Value(12)).current;

    // Slide indicator spring animation
    useEffect(() => {
        const index = activeTab === "albums" ? 0 : activeTab === "artists" ? 1 : 2;
        Animated.spring(slideAnim, {
            toValue: index * tabWidth,
            useNativeDriver: true,
            tension: 80,
            friction: 10,
        }).start();
    }, [activeTab, tabWidth]);

    // Active Screen transition animation (Fade & Subtle Slide In)
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
    }, [activeTab]);

    // Lazy load / Only render active screen for maximum performance and minimum RAM usage
    const renderActiveScreen = () => {
        switch (activeTab) {
            case "albums":
                return <AlbumsScreen />;
            case "artists":
                return <ArtistsScreen />;
            case "musics":
                return <MusicsScreen />;
        }
    };

    return (
        <View style={styles.container}>
            <Header title="Descubrir, explorar" />

            {/* Custom Tab Row with Sliding Pill Background */}
            <View style={styles.chipRow}>
                {/* Sliding active capsule background */}
                <Animated.View
                    style={[
                        styles.activeCapsule,
                        {
                            width: tabWidth,
                            transform: [{ translateX: slideAnim }],
                        },
                    ]}
                />

                {/* Tabs */}
                <Pressable
                    style={styles.tabButton}
                    onPress={() => setActiveTab("albums")}
                >
                    <Text
                        style={[
                            styles.tabText,
                            { fontFamily: activeTab === "albums" ? fontFamilyBold : fontFamilyRegular },
                            activeTab === "albums" ? styles.tabTextActive : styles.tabTextInactive,
                        ]}
                    >
                        Albums
                    </Text>
                </Pressable>

                <Pressable
                    style={styles.tabButton}
                    onPress={() => setActiveTab("artists")}
                >
                    <Text
                        style={[
                            styles.tabText,
                            { fontFamily: activeTab === "artists" ? fontFamilyBold : fontFamilyRegular },
                            activeTab === "artists" ? styles.tabTextActive : styles.tabTextInactive,
                        ]}
                    >
                        Artist
                    </Text>
                </Pressable>

                <Pressable
                    style={styles.tabButton}
                    onPress={() => setActiveTab("musics")}
                >
                    <Text
                        style={[
                            styles.tabText,
                            { fontFamily: activeTab === "musics" ? fontFamilyBold : fontFamilyRegular },
                            activeTab === "musics" ? styles.tabTextActive : styles.tabTextInactive,
                        ]}
                    >
                        Only music
                    </Text>
                </Pressable>
            </View>

            {/* Transition Container */}
            <Animated.View
                style={[
                    styles.screenContainer,
                    {
                        opacity: fadeAnim,
                        transform: [{ translateX: translateXAnim }],
                    },
                ]}
            >
                {renderActiveScreen()}
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 90, // Leave clear spacing so content is never hidden behind floating absolute Navbar
    },
    chipRow: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#151124", // Cosmic dark capsule row
        borderRadius: 24,
        padding: 4,
        marginTop: 10,
        marginBottom: 20,
        position: "relative",
        borderWidth: 1.5,
        borderColor: "#221b3a",
    },
    activeCapsule: {
        position: "absolute",
        top: 4,
        bottom: 4,
        left: 4,
        backgroundColor: "#8B5CF6", // Cosmic electric purple pill
        borderRadius: 20,
        shadowColor: "#8B5CF6",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
        elevation: 4,
    },
    tabButton: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 10,
        zIndex: 1, // Draw button text on top of absolute active capsule
    },
    tabText: {
        fontSize: 14,
    },
    tabTextActive: {
        color: "#ffffff",
    },
    tabTextInactive: {
        color: "#a6a0c5", // Soft cosmic lavender
    },
    screenContainer: {
        flex: 1,
    },
});
