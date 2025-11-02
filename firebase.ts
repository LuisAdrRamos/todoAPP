import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// 🟢 CONFIGURACIÓN LEYENDO VARIABLES DE ENTORNO
const firebaseConfig = {
    apiKey: process.env.EXPO_PUBLIC_API_KEY,
    authDomain: process.env.EXPO_PUBLIC_AUTH_DOMAIN,
    projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
    storageBucket: process.env.EXPO_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: process.env.EXPO_PUBLIC_MESSAGING_SENDER_ID,
    appId: process.env.EXPO_PUBLIC_APP_ID
};

// Initialize Firebase
// Nota: Comprobamos si las claves existen antes de inicializar (Buena Práctica)
if (!firebaseConfig.apiKey) {
    throw new Error("Firebase API Key is missing. Check your .env file.");
}

const app = initializeApp(firebaseConfig as any); // Usamos 'as any' para evitar errores de tipado de TS

export const db = getFirestore(app)

export const auth = getAuth(app);
