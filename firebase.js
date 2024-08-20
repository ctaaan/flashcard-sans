// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCHiJ81qM3gYbCkxao2PjkdKlNFeT2yUuA",
  authDomain: "flashcardsaas-3ca24.firebaseapp.com",
  projectId: "flashcardsaas-3ca24",
  storageBucket: "flashcardsaas-3ca24.appspot.com",
  messagingSenderId: "491651665799",
  appId: "1:491651665799:web:321000d88a9a59094d0d22",
  measurementId: "G-7ED871ZXRV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app)

export {db}