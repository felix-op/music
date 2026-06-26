import { usePathname } from "expo-router";

import { ROUTES, useAppTheme } from "@services/index";
import { useRef } from "react";
import { Animated, View } from "react-native";
import usePlayList from "../../hooks/usePlayList";
import { NavbarButton } from "./NavbarButton";
import { NavbarContainer } from "./NavbarContainer";

export function Navbar() {
    const { theme } = useAppTheme();
    const pathname = usePathname();
    const rutasNavbar = ROUTES.filter(
        (route) => route.navbar
    );
    const index = rutasNavbar.findIndex((route) => (
        pathname === route.href || pathname.startsWith(route.href + "/")
    ));
    const animValue = useRef(new Animated.Value(1)).current;
    const { isPlayListMode, botones } = usePlayList();

    const scaleX = animValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1], // Grows the indicator from center (0 to full width)
    });
    const opacity = animValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1], // Fades the indicator in
    });

    return (
        <View>
            <NavbarContainer>
                {/* MAIN NAVBAR */}
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        height: "100%",
                        width: "100%",
                    }}
                >
                    {rutasNavbar.map((route) => (
                        <NavbarButton
                            key={route.id}
                            pathname={pathname}
                            route={route}
                        />
                    ))}
                </View>
            </NavbarContainer>
        </View>
    );
}
