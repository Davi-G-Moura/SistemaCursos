// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBHuI3WAxxJ4KD_Yzpa7iX6CK2iCR9RPu0",
  authDomain: "idiomafast-c2b39.firebaseapp.com",
  projectId: "idiomafast-c2b39",
  storageBucket: "idiomafast-c2b39.appspot.com",
  messagingSenderId: "329048083819",
  appId: "1:329048083819:web:ab6205d7b4a0055c89502e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
export const storage = getStorage(app);
