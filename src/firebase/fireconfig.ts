import { initializeApp } from "firebase/app"
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC7RshUCH-PPj-Z1UxL54pivs-lkPdAT8M",
  authDomain: "shared-document-editor.firebaseapp.com",
  projectId: "shared-document-editor",
  storageBucket: "shared-document-editor.firebasestorage.app",
  messagingSenderId: "486433864143",
  appId: "1:486433864143:web:606214ec014c83a71dfaba"
};

const app = initializeApp(firebaseConfig);


export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth(app);

