import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from 'react-native';
import { useAuth } from '@/src/presentation/hooks/useAuth';
import { useRouter } from 'expo-router';
import { useColorScheme } from '@/hooks/use-color-scheme';

// Usaremos los estilos base de Login/Register
export default function ForgotPasswordScreen() {
    const [email, setEmail] = useState("");
    const { forgotPassword, loading, error } = useAuth();
    const router = useRouter();
    const colorScheme = useColorScheme();

    const handlePasswordReset = async () => {
        const success = await forgotPassword(email);
        if (success) {
            Alert.alert(
                "Email Enviado",
                "Si existe una cuenta con ese email, recibirás un enlace para recuperar tu contraseña.",
                [{ text: "OK", onPress: () => router.back() }]
            );
        } else {
            Alert.alert("Error", error || "No se pudo enviar el email.");
        }
    };

    return (
        <KeyboardAvoidingView
            style={[styles.container, colorScheme === 'dark' && styles.containerDark]}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.content}>
                    <Text style={[styles.title, colorScheme === 'dark' && styles.textDark]}>Recuperar Contraseña</Text>
                    <Text style={[styles.subtitle, colorScheme === 'dark' && styles.textSecondaryDark]}>Ingresa tu email para recibir un enlace de recuperación.</Text>
                    
                    <TextInput
                        style={[styles.input, colorScheme === 'dark' && styles.inputDark]}
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        placeholderTextColor={colorScheme === 'dark' ? '#777' : '#999'}
                    />
                    
                    <TouchableOpacity
                        style={[styles.button, loading && styles.buttonDisabled]}
                        onPress={handlePasswordReset}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={styles.buttonText}>Enviar Email</Text>
                        )}
                    </TouchableOpacity>
                    
                    <TouchableOpacity onPress={() => router.back()} style={styles.LinkButton}>
                        <Text style={[styles.LinkText, colorScheme === 'dark' && styles.textSecondaryDark]}>
                            Volver a Iniciar Sesión
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

// Estilos (similares a Login.tsx)
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    containerDark: {
        backgroundColor: "#000",
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: "center",
    },
    content: {
        padding: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        marginBottom: 15,
        textAlign: "center",
        color: '#000',
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 40,
        textAlign: "center",
        color: "#555",
    },
    textDark: {
        color: '#fff',
    },
    textSecondaryDark: {
        color: '#999',
    },
    input: {
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        fontSize: 16,
        borderWidth: 1,
        borderColor: "#ddd",
        color: '#000',
    },
    inputDark: {
        backgroundColor: '#1c1c1e',
        borderColor: '#38383a',
        color: '#fff',
    },
    button: {
        backgroundColor: "#007AFF",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 10,
    },
    buttonDisabled: {
        backgroundColor: "#999",
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    LinkButton: {
        marginTop: 20,
        padding: 10,
    },
    LinkText: {
        color: "#666",
        textAlign: "center",
        fontSize: 16,
    },
});