import React, { createContext, useState, useContext, ReactNode } from "react";

export type FontOption = "Caveat" | "Poppins" | "SourceCodePro" | "Finlandica";

interface FontContextType {
    selectedFont: FontOption;
    fontFamilyBold: string;
    fontFamilyRegular: string;
    changeFont: (font: FontOption) => void;
}

const FontContext = createContext<FontContextType | undefined>(undefined);

export const FontProvider = ({ children }: { children: ReactNode }) => {
    // "Finlandica" is our default modern geometric font
    const [selectedFont, setSelectedFont] = useState<FontOption>("Finlandica");

    const changeFont = (font: FontOption) => {
        setSelectedFont(font);
    };

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

    return (
        <FontContext.Provider value={{ selectedFont, fontFamilyBold, fontFamilyRegular, changeFont }}>
            {children}
        </FontContext.Provider>
    );
};

export const useAppFont = () => {
    const context = useContext(FontContext);
    if (!context) {
        throw new Error("useAppFont must be used within a FontProvider");
    }
    return context;
};
