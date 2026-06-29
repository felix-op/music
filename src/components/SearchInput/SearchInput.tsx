import { Ionicons } from "@expo/vector-icons";
import { useAppFont, useAppTheme } from "@services";
import { TextInput, View } from "react-native";
import { styles } from "./estilos";

type TProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
};

export function SearchInput({
  value,
  onChangeText,
  placeholder = "Buscar...",
}: TProps) {
  const { theme } = useAppTheme();
  const { fontFamilyRegular } = useAppFont();

  return (
    <View
      style={[
        styles.wrapper,
        {
          backgroundColor: theme.background.paper,
          borderColor: theme.divider,
        },
      ]}
    >
      <Ionicons name="search" size={16} color={theme.text.secondary} />
      <TextInput
        style={[
          styles.input,
          { fontFamily: fontFamilyRegular, color: theme.text.primary },
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.text.secondary}
        returnKeyType="search"
        clearButtonMode="while-editing"
      />
    </View>
  );
}
