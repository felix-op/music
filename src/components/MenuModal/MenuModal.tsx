import { Ionicons } from "@expo/vector-icons";
import { useAppFont, useAppTheme } from "@services";
import { Modal, Pressable } from "react-native";
import { Typography } from "@components";
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

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="slide"
            onRequestClose={onClose}
        >
            <Pressable style={styles.overlay} onPress={onClose}>
                <Pressable 
                    style={[styles.content, { backgroundColor: theme.background.paper, borderRadius: theme.shape.borderRadius }]}
                    // Previene que los toques dentro del modal lo cierren
                    onPress={(e) => e.stopPropagation()}
                >
                    {title && (
                        <Typography variant="subtitle" weight="bold" style={styles.title}>
                            {title}
                        </Typography>
                    )}
                    
                    {options.map((option, index) => (
                        <Pressable 
                            key={index} 
                            style={({ pressed }) => [
                                styles.option,
                                //pressed && { opacity: 0.6 } // Efecto visual al presionar
                                // Alternativa con color de fondo:
                                pressed && { backgroundColor: theme.action.hover, borderRadius: theme.shape.borderRadius / 2 }
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
                            <Typography 
                                variant="bodyLarge"
                                style={[styles.optionText, option.color ? { color: option.color } : undefined]}
                            >
                                {option.label}
                            </Typography>
                        </Pressable>
                    ))}
                </Pressable>
            </Pressable>
        </Modal>
    );
};

