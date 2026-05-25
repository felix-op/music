import { Slot, router } from "expo-router";
import { View, StyleSheet } from "react-native";
import { Header, ChipButton } from "@components";
import { useState } from "react";

type TProps = {
    activeTab: string;
    children: ReactNode;
};

export function ExploreScreen({ children, activeTab }: TProps) {
    return (
        <View style={styles.container}>
            <Header title="Descubrir, explorar" />
            <View style={styles.chipRow}>
                <ChipButton
                    title="Albums"
                    active={activeTab === "albums"}
                    onPress={() => router.replace("/explore/albums")}
                />
                <ChipButton
                    title="Artist"
                    active={activeTab === "artists"}
                    onPress={() => router.replace("/explore/artists")}
                />
                <ChipButton
                    title="Only music"
                    active={activeTab === "musics"}
                    onPress={() => router.replace("/explore/musics")}
                />
            </View>
            <View style={styles.content}>
                {children}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    chipRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 12,
        marginTop: 10,
        marginBottom: 16,
    },
    content: {
        flex: 1,
        paddingBottom: 90, // Leave clear spacing so content is never hidden behind floating absolute Navbar
    },
});
