import React from "react";
import { useAppTheme } from "@services";
import { Modal, Pressable, View, StyleSheet } from "react-native";
import { Typography } from "../Typography/Typography";
import { BotonGuardar } from "../Buttons/BotonGuardar";
import { BotonCancelar } from "../Buttons/BotonCancelar";

interface FormModalProps {
    visible: boolean;
    onClose: () => void;
    onSave: () => void;
    title: string;
    children: React.ReactNode;
    saveLabel?: string;
    cancelLabel?: string;
}

export const FormModal = ({ 
    visible, 
    onClose, 
    onSave, 
    title, 
    children,
    saveLabel = "Guardar",
    cancelLabel = "Cancelar"
}: FormModalProps) => {
    const { theme } = useAppTheme();

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
            onRequestClose={onClose}
        >
            <Pressable style={styles.overlay} onPress={onClose}>
                <Pressable 
                    style={[styles.content, { backgroundColor: theme.background.paper, borderRadius: theme.shape.borderRadius }]}
                    onPress={(e) => e.stopPropagation()}
                >
                    <Typography variant="subtitle" weight="bold" style={styles.title}>
                        {title}
                    </Typography>
                    
                    <View style={styles.body}>
                        {children}
                    </View>

                    <View style={styles.footer}>
                        <BotonCancelar 
                            label={cancelLabel} 
                            onPress={onClose} 
                        />
                        <BotonGuardar 
                            label={saveLabel} 
                            onPress={onSave} 
                        />
                    </View>
                </Pressable>
            </Pressable>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    content: {
        width: "100%",
        maxWidth: 400,
        borderRadius: 16,
        padding: 20,
        gap: 16,
    },
    title: {
        marginBottom: 8,
    },
    body: {
        gap: 12,
    },
    footer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        gap: 12,
        marginTop: 16,
    }
});
