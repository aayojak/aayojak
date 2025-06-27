// firebase.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyBeCQ1H9xrOf94ZnukOhfzdqO5-_DbxK-E",
  authDomain: "aayojak.firebaseapp.com",
  projectId: "aayojak",
  storageBucket: "aayojak.appspot.com",
  messagingSenderId: "405262152027",
  appId: "1:405262152027:web:7885c2879ab7d5ed376a7e",
  measurementId: "G-N0FTGCKMTB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
