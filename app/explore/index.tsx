import { AnimatedTabBar, Header } from "@components";
import { AnimatedTabContent } from "@components/AnimatedTabBar/AnimatedTabContent";
import { TabItem } from "@models";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import AlbumsScreen from "../../src/screens/explore/AlbumsScreen";
import ArtistsScreen from "../../src/screens/explore/ArtistsScreen";
import MusicScreen from "../../src/screens/explore/MusicScreen";

type TabType = "albums" | "artists" | "musics";

const EXPLORE_TABS: TabItem[] = [
    { id: "albums", label: "Albums", component: AlbumsScreen },
    { id: "artists", label: "Artist", component: ArtistsScreen },
    { id: "musics", label: "Only music", component: MusicScreen },
];

export default function ExplorePage() {
    const [activeTab, setActiveTab] = useState<TabType>("albums");

    return (
        <View style={styles.container}>
            <Header title="Descubrir, explorar" hideBack />

            <AnimatedTabBar
                tabs={EXPLORE_TABS} 
                activeTab={activeTab} 
                onTabChange={(id) => setActiveTab(id as TabType)} 
            />

            <AnimatedTabContent 
                tabs={EXPLORE_TABS} 
                activeTabKey={activeTab} 
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 90,
    },
    screenContainer: {
        flex: 1,
    },
});