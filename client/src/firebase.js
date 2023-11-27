// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "air-estate.firebaseapp.com",
    projectId: "air-estate",
    storageBucket: "air-estate.appspot.com",
    messagingSenderId: "81775727713",
    appId: "1:81775727713:web:abde7cd0c92dd56a0c4620"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);