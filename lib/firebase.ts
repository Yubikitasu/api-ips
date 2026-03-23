// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZOeP0JooxFk-1qjsyeAbFyi4wgZ5R9kI",
  authDomain: "ws-api-33493.firebaseapp.com",
  databaseURL: "https://ws-api-33493-default-rtdb.firebaseio.com",
  projectId: "ws-api-33493",
  storageBucket: "ws-api-33493.firebasestorage.app",
  messagingSenderId: "613209875887",
  appId: "1:613209875887:web:ab989d6b7be7c6e4587b5a",
  measurementId: "G-QPZYPGWTTE"
};

// Initialize Firebase
// Khởi tạo Firebase (tránh khởi tạo lại nhiều lần)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const database = getDatabase(app);

export { database };