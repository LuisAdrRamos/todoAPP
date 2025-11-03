// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import { 
    initializeAuth, 
    // @ts-ignore 
    getReactNativePersistence 
} from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: "AIzaSyCrCTA3vR1UE8-CUcs1DhPP5ZhMcEXcx8E",
    authDomain: "waos-a8e4c.firebaseapp.com",
    projectId: "waos-a8e4c",
    storageBucket: "waos-a8e4c.firebasestorage.app",
    messagingSenderId: "261763632843",
    appId: "1:261763632843:web:b75c3898dd84bad01b554e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)

const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export { auth };
// export const auth = getAuth(app);