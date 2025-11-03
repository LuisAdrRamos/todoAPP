import { StyleSheet } from 'react-native';
// Importamos el Tema y la factory base de todos.styles.ts
import { TodosTheme, createStyles as createTodoStyles } from './todos.styles';

// Esta nueva función crea y combina todos los estilos para la pantalla de Perfil
export const createStyles = (theme: TodosTheme) => {
    
    // 1. Obtenemos los estilos base (como container, input, title)
    const baseStyles = createTodoStyles(theme);

    // 2. Definimos los estilos específicos del perfil (lo que antes era 'localStyles')
    // Usamos 'as const' para ayudar a TypeScript con los tipos de 'fontWeight', etc.
    const profileSpecificStyles = {
        scrollContent: {
            flexGrow: 1,
            justifyContent: 'center' as const,
        },
        content: {
            padding: 20,
        },
        label: {
            fontSize: 16,
            marginBottom: 8,
            fontWeight: '600' as const,
            color: theme.textSecondary, // Aplicamos el color del tema
        },
        disabledInput: {
            ...baseStyles.input, // Extendemos el estilo 'input' base
            backgroundColor: theme.background === '#000000' ? '#2c2c2e' : '#eee',
            color: theme.textSecondary,
        },
        // 🟢 FIX: AÑADIMOS EL ESTILO 'button' GENÉRICO QUE FALTABA
        button: {
            padding: 15,
            borderRadius: 10,
            alignItems: 'center' as const,
        },
        saveButton: {
            backgroundColor: '#34C759', // Verde
            marginTop: 20,
        },
        buttonDisabled: {
            backgroundColor: '#999',
        },
        buttonText: {
            color: '#fff',
            fontSize: 18,
            fontWeight: 'bold' as const,
        },
        backButton: {
            backgroundColor: 'transparent',
            marginTop: 10,
            borderWidth: 2,
            borderColor: theme.primary, // Aplicamos color del tema
        },
        backButtonText: {
            color: theme.primary, // Aplicamos color del tema
            fontSize: 18,
            fontWeight: 'bold' as const,
            textAlign: 'center' as const,
        },
    };

    // 3. Combinamos los estilos base y los específicos en una sola hoja de estilos
    return StyleSheet.create({
        ...baseStyles,
        ...profileSpecificStyles
    });
};
