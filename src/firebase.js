import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBd2TGshPCGB-1z0uSS_r9fKF2AXwAwuMI",
  authDomain: "habit-productivity-tracker.firebaseapp.com",
  projectId: "habit-productivity-tracker",
  storageBucket: "habit-productivity-tracker.firebasestorage.app",
  messagingSenderId: "1094967955385",
  appId: "1:1094967955385:web:2af3c9c8df882d0021b068"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;