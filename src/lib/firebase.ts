import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBVkSE5dgm2wMuuk3P12T4GmKC2OPiHpIc",
  authDomain: "ivsc-iverservice.firebaseapp.com",
  projectId: "ivsc-iverservice",
  storageBucket: "ivsc-iverservice.firebasestorage.app",
  messagingSenderId: "835725077588",
  appId: "1:835725077588:web:b70b25746f6a6989d851c1",
  measurementId: "G-S2CJBK4ZNW"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);