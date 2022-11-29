import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "bookmyticket-a4fd5.firebaseapp.com",
  projectId: "bookmyticket-a4fd5",
  storageBucket: "bookmyticket-a4fd5.appspot.com",
  messagingSenderId: "601373317129",
  appId: "1:601373317129:web:5b4e439cbf35d045e940d8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export {auth, db};
