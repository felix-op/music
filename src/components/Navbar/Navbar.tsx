import { usePathname } from "expo-router";

import { Ionicons } from "@expo/vector-icons";
import { ROUTES } from "@services/index";
import { useEffect } from "react";
import { Pressable, View } from "react-native";
import usePlayList from "../../hooks/usePlayList";
import { NavbarButton } from "./NavbarButton";
import { NavbarContainer } from "./NavbarContainer";


export function Navbar() {
    const pathname = usePathname();
    const { isPlayListMode, botones } = usePlayList();
    const rutasNavbar = ROUTES.filter(
        (route) => route.navbar
    );



    // if (isPlayListMode) {
    //     return (
    //         <NavbarContainer>
    //             {botones.map((boton) => (
    //                 <Pressable onPress={boton.onPress}>
    //                     <Ionicons
    //                         name={boton.icon!}
    //                         size={30}
    //                         color={"#fff"}
    //                     />
    //                 </Pressable>
    //             ))}
    //         </NavbarContainer>
    //     )
    // }

    // return (
    //     <NavbarContainer>
    //         {rutasNavbar.map((route) => <NavbarButton pathname={pathname} route={route} />)}
    //     </NavbarContainer>
    // );

    return (
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
    );
}
