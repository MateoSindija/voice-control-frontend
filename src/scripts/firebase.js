// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getFirestore,
  doc,
  setDoc,
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAW_-ZFoTtF2B0OkYNlhOj62PQU_rN6qC8",
  authDomain: "voice-control-bfd3f.firebaseapp.com",
  projectId: "voice-control-bfd3f",
  storageBucket: "voice-control-bfd3f.appspot.com",
  messagingSenderId: "496149817440",
  appId: "1:496149817440:web:bf20427e688df71f3bfb05",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export { doc, setDoc, collection, addDoc };
