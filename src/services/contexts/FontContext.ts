import { createContext, useContext } from "react";

export type FontOption = "Caveat" | "Poppins" | "SourceCodePro" | "Finlandica";

export interface FontOptionConfig {
    key: FontOption;
    label: string;
    sample: string;
    previewFont: string;
}

export const fontOptions: FontOptionConfig[] = [
    {
        key: "Caveat",
        label: "Caveat",
        sample: "Música & Sentimiento",
        previewFont: "Caveat-Bold",
    },
    {
        key: "Poppins",
        label: "Poppins",
        sample: "Modern Style",
        previewFont: "Poppins-Bold",
    },
    {
        key: "SourceCodePro",
        label: "Source Code Pro",
        sample: "const music = true;",
        previewFont: "SourceCodePro-Bold",
    },
    {
        key: "Finlandica",
        label: "Finlandica",
        sample: "Nordic Design",
        previewFont: "Finlandica-Bold",
    },
];

export interface FontContextType {
    selectedFont: FontOption;
    fontFamilyBold: string;
    fontFamilyRegular: string;
    changeFont: (font: FontOption) => void;
    fontOptions: FontOptionConfig[];
}

export const FontContext = createContext<FontContextType | undefined>(undefined);

export const useAppFont = () => {
    const context = useContext(FontContext);
    if (!context) {
        throw new Error("useAppFont must be used within a FontProvider");
    }
    return context;
};
