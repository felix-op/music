import React from "react";
import { StyleProp, Text, TextProps, TextStyle } from "react-native";
import { useAppFont, useAppTheme } from "@services";

type TypographyVariant = 
    | "h1" 
    | "h2" 
    | "h3" 
    | "title" 
    | "subtitle" 
    | "bodyLarge" 
    | "body" 
    | "bodySmall" 
    | "caption" 
    | "tiny";

type TypographyColor = 
    | "primary" 
    | "secondary" 
    | "disabled" 
    | "accent" 
    | "white" 
    | "black";

type TypographyWeight = "regular" | "bold" | "semibold";

type TypographyProps = TextProps & {
    variant?: TypographyVariant;
    color?: TypographyColor;
    weight?: TypographyWeight;
    align?: "auto" | "left" | "right" | "center" | "justify";
    style?: StyleProp<TextStyle>;
    children: React.ReactNode;
};

export function Typography({
    variant = "body",
    color = "primary",
    weight = "regular",
    align,
    style,
    children,
    ...props
}: TypographyProps) {
    const { theme } = useAppTheme();
    const { fontFamilyRegular, fontFamilyBold } = useAppFont();

    const getFontSize = (v: TypographyVariant): number => {
        switch (v) {
            case "h1": return 30;
            case "h2": return 24;
            case "h3": return 22;
            case "title": return 20;
            case "subtitle": return 18;
            case "bodyLarge": return 16;
            case "body": return 14;
            case "bodySmall": return 13;
            case "caption": return 12;
            case "tiny": return 10;
            default: return 14;
        }
    };

    const getTextColor = (c: TypographyColor): string => {
        switch (c) {
            case "primary": return theme.text.primary;
            case "secondary": return theme.text.secondary;
            case "disabled": return theme.text.disabled;
            case "accent": return theme.primary.main;
            case "white": return "#ffffff";
            case "black": return "#000000";
            default: return theme.text.primary;
        }
    };

    const getFontFamily = (w: TypographyWeight): string => {
        switch (w) {
            case "bold": return fontFamilyBold;
            // For semibold we can just fallback to regular with fontWeight or just use bold.
            // Since fontFamilyRegular + fontWeight doesn't always map to a semi-bold font file,
            // we'll use bold for now or regular with '600' weight. 
            // We'll return fontFamilyRegular for semibold and handle fontWeight in the style.
            case "semibold": return fontFamilyRegular;
            case "regular":
            default: return fontFamilyRegular;
        }
    };

    const getFontWeight = (w: TypographyWeight): TextStyle["fontWeight"] => {
        switch (w) {
            case "semibold": return "600";
            default: return undefined;
        }
    };

    return (
        <Text
            style={[
                {
                    fontSize: getFontSize(variant),
                    color: getTextColor(color),
                    fontFamily: getFontFamily(weight),
                    fontWeight: getFontWeight(weight),
                    textAlign: align,
                },
                style,
            ]}
            {...props}
        >
            {children}
        </Text>
    );
}
