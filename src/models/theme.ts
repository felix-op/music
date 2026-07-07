export interface PaletteIntent {
    main: string;
    light: string;
    dark: string;
    contrastText: string;
}

export interface TypeText {
    primary: string;
    secondary: string;
    disabled: string;
}

export interface TypeBackground {
    default: string;
    paper: string;
}

export interface TypeAction {
    active: string;
    hover: string;
    selected: string;
    disabled: string;
    disabledBackground: string;
}

export interface ColorScale {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
}

export interface ThemeShape {
    borderRadius: number;
}

export interface ThemePalette {
    mode: 'light' | 'dark';
    primary: PaletteIntent;
    secondary: PaletteIntent;
    error: PaletteIntent;
    warning: PaletteIntent;
    info: PaletteIntent;
    success: PaletteIntent;
    text: TypeText;
    background: TypeBackground;
    action: TypeAction;
    divider: string;
    common: {
        black: string;
        white: string;
    };
    grey: ColorScale;
    shape: ThemeShape;
}