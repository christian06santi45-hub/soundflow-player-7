// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCgpogHdktpCsdSMSfY4o4LUeSsvW-6dEg",
  authDomain: "soundflow-player-7.firebaseapp.com",
  projectId: "soundflow-player-7",
  storageBucket: "soundflow-player-7.firebasestorage.app",
  messagingSenderId: "352069656376",
  appId: "1:352069656376:web:67557a915d3ea093c5abcd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
