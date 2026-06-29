import { Stack } from "expo-router";

type TProps = {
    title: string;
    hideBack?: boolean;
};

export function Header({ title, hideBack = false }: TProps) {
    return (
        <Stack.Screen
            options={{
                headerShown: true,
                title,
                headerBackVisible: !hideBack,
                ...(hideBack && { headerLeft: () => null }),
            }}
        />
    );
}
