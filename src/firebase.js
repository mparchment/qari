// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCTo2bL_qRQU9_3FazZFgxYpq-yM5GkY04",
  authDomain: "qari-4815f.firebaseapp.com",
  projectId: "qari-4815f",
  storageBucket: "qari-4815f.appspot.com",
  messagingSenderId: "875991951810",
  appId: "1:875991951810:web:4137478b89c52ed0740e5b",
  measurementId: "G-6SS9NV7RVF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app); // Initialize Firebase Storage

// Export the app and storage
export { app, storage };
