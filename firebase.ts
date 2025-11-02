// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
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