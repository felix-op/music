import { Stack } from "expo-router";

type TProps = {
    title: string
};

export function Header(props: TProps) {
    return (
        <Stack.Screen
            options={{
                headerShown: true,
                title: props.title,
            }}
        />
    );
}
