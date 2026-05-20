import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function Page() {
    const { genre } = useLocalSearchParams();

    return (
        <View>
            <Text>Album Genero: {genre}</Text>
        </View>
    );
}