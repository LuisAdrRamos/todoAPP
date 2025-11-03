import React, { useState, useEffect, useMemo } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from 'react-native';
import { useAuth } from '@/src/presentation/hooks/useAuth';
import { useRouter } from 'expo-router';
import { useColorScheme } from '@/hooks/use-color-scheme';
// Importamos los creadores de estilos que ya definimos en el deber
import { createStyles, createStyles as createTodoStyles } from '@/src/presentation/styles/profile.styles';
import { defaultDarkTheme, defaultLightTheme } from '@/src/presentation/styles/todos.styles';

export default function ProfileScreen() {
    const { user, loading, updateProfile, error } = useAuth();
    const router = useRouter();

    // Estado local para el campo de texto
    const [displayName, setDisplayName] = useState(user?.displayName || '');

    // Sincronizar el estado local si el usuario cambia (ej. en la carga inicial)
    useEffect(() => {
        if (user?.displayName) {
            setDisplayName(user.displayName);
        }
    }, [user]);

    // Manejador para guardar
    const handleSave = async () => {
        if (!displayName.trim()) {
            Alert.alert('Error', 'El nombre no puede estar vacío.');
            return;
        }

        const success = await updateProfile(displayName.trim());

        if (success) {
            Alert.alert('Éxito', 'Tu perfil ha sido actualizado.', [
                { text: 'OK', onPress: () => router.back() },
            ]);
        } else {
            Alert.alert('Error', error || 'No se pudo actualizar el perfil.');
        }
    };

    // Estilos dinámicos
    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? defaultDarkTheme : defaultLightTheme;
    // Reutilizamos el factory de todos.styles.ts y añadimos estilos locales
    const styles = useMemo(() => createStyles(theme), [colorScheme]);


    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.content}>
                    <Text style={styles.title}>Mi Perfil</Text>

                    {/* Campo de Email (No editable) */}
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={[styles.input, styles.disabledInput, colorScheme === 'dark' && styles.disabledInput]}
                        value={user?.email || ''}
                        editable={false}
                        selectTextOnFocus={false}
                        placeholderTextColor={theme.placeholder}
                    />

                    {/* Campo de Nombre (Editable) */}
                    <Text style={styles.label}>Nombre de Usuario</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Nombre de usuario"
                        value={displayName}
                        onChangeText={setDisplayName}
                        placeholderTextColor={theme.placeholder}
                    />

                    {/* Botón Guardar */}
                    <TouchableOpacity
                        style={[styles.button, styles.saveButton, (loading || displayName === user?.displayName) && styles.buttonDisabled]}
                        onPress={handleSave}
                        disabled={loading || displayName === user?.displayName}
                    >
                        {loading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={styles.buttonText}>Guardar Cambios</Text>
                        )}
                    </TouchableOpacity>

                    {/* Botón Volver */}
                    <TouchableOpacity
                        style={[styles.button, styles.backButton, { borderColor: theme.primary }]}
                        onPress={() => router.back()}
                        disabled={loading}
                    >
                        <Text style={[styles.backButtonText, { color: theme.primary }]}>Volver</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
