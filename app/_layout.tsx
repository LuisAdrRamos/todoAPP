import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, useRouter, useSegments } from "expo-router"; // NUEVO: useRouter, useSegments
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { container } from "@/src/di/container";
import { useAuth } from "@/src/presentation/hooks/useAuth"; // NUEVO

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const [loaded] = useFonts({
        SpaceMono: require("@/assets/fonts/SpaceMono-BoldItalic.ttf"),
    });

    // 🟢 Inicialización del Contenedor
    const [containerReady, setContainerReady] = useState(false);

    // 🟢 NUEVO: Estados de Auth y Router
    const { user, loading: authLoading } = useAuth(); // NUEVO: user, authLoading
    const segments = useSegments(); // NUEVO: Para saber la ruta actual
    const router = useRouter(); // NUEVO: Para navegar

    useEffect(() => {
        const initContainer = async () => {
            try {
                await container.initialize();
                setContainerReady(true);
            } catch (error) {
                console.error("Error initializing container:", error);
            }
        };

        initContainer();
    }, []);

    // 🟢 NUEVO: Lógica de Protección de Rutas
    useEffect(() => {
        // Esperar a que el contenedor y la autenticación terminen de cargar
        if (!containerReady || authLoading) return;

        const segment1 = segments[1] as string | undefined; // Aseguramos que es un string (o undefined) para evitar la limitación de TypeScript

        // Determinar si la ruta actual es Login o Register
        const inAuthGroup = segments[0] === "(tabs)" &&
            (segment1 === "login" || segment1 === "register");

        if (!user && !inAuthGroup) {
            // Usuario NO autenticado intenta acceder a /todos o cualquier ruta protegida
            router.replace("/(tabs)/login" as any);
        } else if (user && inAuthGroup) {
            // Usuario SÍ autenticado intenta acceder a /login o /register
            router.replace("/(tabs)/todos");
        }
    }, [user, segments, containerReady, authLoading, router]);

    // 🟢 Ocultar Splash Screen
    useEffect(() => {
        if (loaded && containerReady && !authLoading) {
            SplashScreen.hideAsync();
        }
    }, [loaded, containerReady, authLoading]);

    // Mostrar indicador de carga mientras se inicializa todo
    if (!loaded || !containerReady || authLoading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    // Stack de Navegación
    return (
        <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="(tabs)/login" />
                <Stack.Screen name="(tabs)/register" />
                <Stack.Screen name="(tabs)/todos" />
            </Stack>
        </ThemeProvider>
    );
}