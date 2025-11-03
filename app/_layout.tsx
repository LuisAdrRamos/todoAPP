import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { container } from "@/src/di/container";
import { useAuth } from "@/src/presentation/hooks/useAuth";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const [loaded] = useFonts({
        SpaceMono: require("@/assets/fonts/SpaceMono-BoldItalic.ttf"),
    });
    const [containerReady, setContainerReady] = useState(false);
    const { user, loading: authLoading } = useAuth();
    const segments = useSegments();
    const router = useRouter();

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

    // 🟢 Lógica de Protección de Rutas (Corregida para incluir forgotPassword)
    useEffect(() => {
        if (!containerReady || authLoading) return;

        const segment1 = segments[1] as string | undefined;
        
        // Comprobamos si estamos en una ruta de autenticación
        const inAuthGroup = segments[0] === "(tabs)" &&
            (segment1 === "login" || segment1 === "register" || segment1 === "forgotPassword"); // 🟢 Nombre actualizado

        if (!user && !inAuthGroup) {
            // Si NO está logueado Y NO está en una ruta de auth, lo mandamos a login
            router.replace("/(tabs)/login");
        } else if (user && inAuthGroup) {
            // Si SÍ está logueado Y está en una ruta de auth, lo mandamos a todos
            router.replace("/(tabs)/todos");
        }
    }, [user, segments, containerReady, authLoading, router]);

    useEffect(() => {
        if (loaded && containerReady && !authLoading) {
            SplashScreen.hideAsync();
        }
    }, [loaded, containerReady, authLoading]);

    // Indicador de carga
    if (!loaded || !containerReady || authLoading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    // 🟢 CORRECCIÓN: Volvemos a listar TODAS las pantallas en el Stack raíz
    // Esto repara el sistema de rutas tipadas (typedRoutes)
    return (
        <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="(tabs)/login" />
                <Stack.Screen name="(tabs)/register" />
                <Stack.Screen name="(tabs)/todos" />
                <Stack.Screen name="(tabs)/profile" />
                <Stack.Screen name="(tabs)/forgotPassword" /> {/* 🟢 Nombre actualizado */}
            </Stack>
        </ThemeProvider>
    );
}