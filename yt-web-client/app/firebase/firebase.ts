// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, User } from "firebase/auth";

import { getFunctions } from "firebase/functions";



const firebaseConfig = {
  apiKey: "AIzaSyBro0pTtQz59uY44ry4YKSeQSCixW97JFk",
  authDomain: "yt-clone-fd44b.firebaseapp.com",
  projectId: "yt-clone-fd44b",
  storageBucket: "yt-clone-fd44b.appspot.com",
  messagingSenderId: "400800269917",
  appId: "1:400800269917:web:adc803f6e6bdb5f204efb4",
  measurementId: "G-5ZECZQWL0Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const functions = getFunctions(app);
const auth = getAuth(app);

export function signInWithGoogle(){
    return signInWithPopup(auth, new GoogleAuthProvider());
}

export function signOut(){
    return auth.signOut();
}

/**
 * Helper function to listen for changes in the authentication state.
 * 
 * @param callback - The callback function to be called when the authentication state changes.
 *                   It receives a `User` object if the user is authenticated, or `null` if the user is not authenticated.
 * @returns A function that can be used to unsubscribe from the authentication state changes.
 */
export function onAuthStateChangedHelper(callback: (user:User |null) => void){
    return onAuthStateChanged(auth, callback);
}

