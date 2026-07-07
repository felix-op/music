import { ThemePalette } from "@models";

export const defaultTheme: ThemePalette = {
    mode: "dark",
    background: {
        default: "#09070F",
        paper: "#151124",
    },
    text: {
        primary: "#eeeeee",
        secondary: "#a6a0c5",
        disabled: "#221b3a",
    },
    primary: {
        main: "#8B5CF6",
        light: "#A78BFA",
        dark: "#7C3AED",
        contrastText: "#FFFFFF",
    },
    secondary: {
        main: "#00F2FE",
        light: "#67E8F9",
        dark: "#0891B2",
        contrastText: "#000000",
    },
    error: {
        main: "#F43F5E",
        light: "#FB7185",
        dark: "#E11D48",
        contrastText: "#FFFFFF",
    },
    warning: {
        main: "#F59E0B",
        light: "#FBBF24",
        dark: "#D97706",
        contrastText: "#000000",
    },
    info: {
        main: "#3B82F6",
        light: "#60A5FA",
        dark: "#2563EB",
        contrastText: "#FFFFFF",
    },
    success: {
        main: "#10B981",
        light: "#34D399",
        dark: "#059669",
        contrastText: "#FFFFFF",
    },
    action: {
        active: "#FFFFFF8A",
        hover: "#FFFFFF14",
        selected: "#FFFFFF29",
        disabled: "#FFFFFF4D",
        disabledBackground: "#FFFFFF1F",
    },
    common: {
        black: "#000000",
        white: "#FFFFFF",
    },
    divider: "#221b3a",
    grey: {
        50: "#F8F7FA",
        100: "#EAE7F2",
        200: "#D4CBE5",
        300: "#BDB0D8",
        400: "#A696C8",
        500: "#8E7DBA",
        600: "#72619E",
        700: "#564882",
        800: "#392E5C",
        900: "#201A36",
    },
    shape: {
        borderRadius: 10,
    },
};