// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBtLa0AWXU8Al2KIRu-ULvrSFP9XSCNeSI",
    authDomain: "react-login-curso.firebaseapp.com",
    projectId: "react-login-curso",
    storageBucket: "react-login-curso.appspot.com",
    messagingSenderId: "314933778137",
    appId: "1:314933778137:web:424cff9372d13fc1f550c8",
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);
