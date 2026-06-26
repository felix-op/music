import { ReactNode, useState } from "react";
import { appThemes, ThemeContext, ThemeContextType, ThemeKey } from "../contexts/ThemeContext";

type TProps = {
    children: ReactNode;
    defaultTheme?: ThemeKey;
};

const THEME_STORAGE_KEY = "@app_theme_colors";

export const ThemeProvider = ({ children, defaultTheme = 'default' }: TProps) => {
  const [currentThemeName, setCurrentThemeName] = useState<ThemeKey>(defaultTheme);

  const setTheme = (themeName: ThemeKey) => {
    if (appThemes[themeName]) {
      setCurrentThemeName(themeName);
    }
  };

  const value: ThemeContextType = {
    theme: appThemes[currentThemeName],
    currentThemeName,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};