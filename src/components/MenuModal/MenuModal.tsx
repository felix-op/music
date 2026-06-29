import { Ionicons } from "@expo/vector-icons";
import { useAppFont, useAppTheme } from "@services";
import { Modal, Pressable, Text } from "react-native";
import { styles } from "./estilos";

export type MenuOption = {
    icon: keyof typeof Ionicons.glyphMap;
    label: string;
    onPress: () => void;
    color?: string; // Útil para acciones destructivas (ej. theme.error.main)
};

interface MenuModalProps {
    visible: boolean;
    onClose: () => void;
    title?: string;
    options: MenuOption[];
}

export const MenuModal = ({ visible, onClose, title, options }: MenuModalProps) => {
    const { theme } = useAppTheme();
    const { fontFamilyRegular, fontFamilyBold } = useAppFont();

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="slide"
            onRequestClose={onClose}
        >
            <Pressable style={styles.overlay} onPress={onClose}>
                <Pressable 
                    style={[styles.content, { backgroundColor: theme.background.paper }]}
                    // Previene que los toques dentro del modal lo cierren
                    onPress={(e) => e.stopPropagation()}
                >
                    {title && (
                        <Text style={[styles.title, { color: theme.text.primary, fontFamily: fontFamilyBold }]}>
                            {title}
                        </Text>
                    )}
                    
                    {options.map((option, index) => (
                        <Pressable 
                            key={index} 
                            style={({ pressed }) => [
                                styles.option,
                                //pressed && { opacity: 0.6 } // Efecto visual al presionar
                                // Alternativa con color de fondo:
                                pressed && { backgroundColor: theme.action.hover, borderRadius: 8 }
                            ]}
                            onPress={() => {
                                option.onPress();
                                onClose(); // Cierra el modal automáticamente tras la acción
                            }}
                        >
                            <Ionicons 
                                name={option.icon} 
                                size={24} 
                                color={option.color ?? theme.text.primary} 
                            />
                            <Text style={[
                                styles.optionText, 
                                { color: option.color ?? theme.text.primary, fontFamily: fontFamilyRegular }
                            ]}>
                                {option.label}
                            </Text>
                        </Pressable>
                    ))}
                </Pressable>
            </Pressable>
        </Modal>
    );
};

