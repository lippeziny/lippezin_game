import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDKtqyAvo8nNebINI6iIbFwyYyXomp-55M",
  authDomain: "lippezingame.firebaseapp.com",
  projectId: "lippezingame",
  storageBucket: "lippezingame.firebasestorage.app",
  messagingSenderId: "690275116956",
  appId: "1:690275116956:web:c26a22dac3c07f56130a59",
  measurementId: "G-FMT175RLFZ"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const rtdb = getDatabase(app);
