// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from 'firebase/database'
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAHHxisRzrQjYHgYU1lCyWOcQDxzMdEL5Y",
  authDomain: "todolistreal-c84e0.firebaseapp.com",
  databaseURL: "https://todolistreal-c84e0-default-rtdb.firebaseio.com",
  projectId: "todolistreal-c84e0",
  storageBucket: "todolistreal-c84e0.appspot.com",
  messagingSenderId: "349229008618",
  appId: "1:349229008618:web:76a0af5831c693db1bf993",
  measurementId: "G-R74JVM56JR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getDatabase(app)
export const auth = getAuth(app)