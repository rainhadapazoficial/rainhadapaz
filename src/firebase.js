import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCT6F_CeUk6cCMFcLU04q_NAxmzUFbqLeQ",
    authDomain: "rainhadapaz-40ff2.firebaseapp.com",
    projectId: "rainhadapaz-40ff2",
    storageBucket: "rainhadapaz-40ff2.firebasestorage.app",
    messagingSenderId: "286643517824",
    appId: "1:286643517824:web:c273f07c59e1cb22182965"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
export const auth = getAuth(app);
