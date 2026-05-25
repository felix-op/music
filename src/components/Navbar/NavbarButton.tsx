import { Ionicons } from "@expo/vector-icons";
import { AppRoute } from "@services/index";
import { router } from "expo-router";
import { useEffect, useRef } from "react";
import { Animated, Pressable } from "react-native";
import { estilos } from "./estilos";

type Props = {
    pathname: string
    route: AppRoute
}

export function NavbarButton({ pathname, route }: Props) {
    const activo =
        pathname === route.href ||
        pathname.startsWith(route.href + "/");

    // Animated value: 0 is inactive, 1 is active
    const animValue = useRef(new Animated.Value(activo ? 1 : 0)).current;

    useEffect(() => {
        Animated.timing(animValue, {
            toValue: activo ? 1 : 0,
            duration: 250, // Smooth transition duration in ms
            useNativeDriver: true, // GPU-accelerated transitions
        }).start();
    }, [activo]);

    // Interpolations for the animation
    const translateY = animValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -6], // Lifts the icon 6px upwards
    });

    const scaleX = animValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1], // Grows the indicator from center (0 to full width)
    });

    const opacity = animValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1], // Fades the indicator in
    });

    return (
        <Pressable
            key={route.id}
            style={estilos.boton}
            onPress={() =>
                router.replace(route.href as any)
            }
        >
            <Animated.View style={{ transform: [{ translateY }] }}>
                <Ionicons
                    name={route.icon!}
                    size={30}
                    color={
                        activo
                            ? "#ffffff"
                            : "#8b86a4" // Cosmic lavender inactive color
                    }
                />
            </Animated.View>

            <Animated.View
                style={[
                    estilos.indicador,
                    {
                        opacity,
                        transform: [{ scaleX }],
                    },
                ]}
            />
        </Pressable>
    );
}
