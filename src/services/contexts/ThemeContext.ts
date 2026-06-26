import { ThemePalette } from "@models";
import { defaultTheme } from "@styles/defaultTheme";
import { createContext, useContext } from "react";

export const appThemes = {
    default: defaultTheme,
}

export type ThemeKey = keyof typeof appThemes;

export interface ThemeContextType {
    theme: ThemePalette;
	currentThemeName: ThemeKey;
	setTheme: (themeName: ThemeKey) => void;
}

export const ThemeContext = createContext<ThemeContextType | null>(null);

export const useAppTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useAppTheme must be used within a ThemeProvider");
    }
    return context;
};
