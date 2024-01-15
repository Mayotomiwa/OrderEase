import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyAa6LyaJTHOWurEZaRKy0I1VV0r-UVdtEc",
    authDomain: "auth-orderease-development.firebaseapp.com",
    projectId: "auth-orderease-development",
    storageBucket: "auth-orderease-development.appspot.com",
    messagingSenderId: "83305460807",
    appId: "1:83305460807:web:6a68a3e4e356bd2b99ed62"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider()

export default app;
