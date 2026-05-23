import React, { ReactNode, useState, useEffect } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { FontContext, FontOption, fontOptions } from "../contexts/FontContext";

// Prevent the splash screen from auto-hiding before asset loading is complete
SplashScreen.preventAutoHideAsync();

type TProps = {
    children: ReactNode;
};

export function FontProvider({ children }: TProps) {
    // "Finlandica" is our default modern geometric font
    const [selectedFont, setSelectedFont] = useState<FontOption>("Finlandica");

    const changeFont = (font: FontOption) => {
        setSelectedFont(font);
    };

    const [loaded, error] = useFonts({
        "Poppins-Regular": require("../../../assets/fonts/Poppins-Regular.ttf"),
        "Poppins-Bold": require("../../../assets/fonts/Poppins-Bold.ttf"),
        "SourceCodePro-Regular": require("../../../assets/fonts/SourceCodePro-Regular.ttf"),
        "SourceCodePro-Bold": require("../../../assets/fonts/SourceCodePro-Bold.ttf"),
        "Caveat-Regular": require("../../../assets/fonts/Caveat.ttf"),
        "Caveat-Bold": require("../../../assets/fonts/Caveat.ttf"),
        "Finlandica-Regular": require("../../../assets/fonts/FinlandicaText.ttf"),
        "Finlandica-Bold": require("../../../assets/fonts/FinlandicaText-Italic.ttf"),
    });

    useEffect(() => {
        if (error) {
            console.error("Font loading error:", error);
        }
        if (loaded || error) {
            SplashScreen.hideAsync();
        }
    }, [loaded, error]);

    // Map selectedFont to the actual loaded expo fonts
    let fontFamilyBold = "Finlandica-Bold";
    let fontFamilyRegular = "Finlandica-Regular";

    if (selectedFont === "Poppins") {
        fontFamilyBold = "Poppins-Bold";
        fontFamilyRegular = "Poppins-Regular";
    } else if (selectedFont === "SourceCodePro") {
        fontFamilyBold = "SourceCodePro-Bold";
        fontFamilyRegular = "SourceCodePro-Regular";
    } else if (selectedFont === "Caveat") {
        fontFamilyBold = "Caveat-Bold";
        fontFamilyRegular = "Caveat-Regular";
    }

    if (!loaded && !error) {
        return null;
    }

    return (
        <FontContext.Provider value={{ selectedFont, fontFamilyBold, fontFamilyRegular, changeFont, fontOptions }}>
            {children}
        </FontContext.Provider>
    );
}
