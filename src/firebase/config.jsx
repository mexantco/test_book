// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import Constants from "expo-constants";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB0Lrh2B26ljLLg9Et_bzCZiqVXJaKcfhA",
  authDomain: "test2-168e4.firebaseapp.com",
  projectId: "test2-168e4",
  storageBucket: "test2-168e4.appspot.com",
  messagingSenderId: "235158703057",
  appId: "1:235158703057:web:87d0c71b74dcaf0cd4eef0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app);


export const db = getFirestore(app);

export { auth };
