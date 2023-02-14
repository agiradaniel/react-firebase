// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore"

import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDu27P1QSY-vBeb_qKlRfXSHRF1LWyaDCQ",
  authDomain: "fir-course-57064.firebaseapp.com",
  projectId: "fir-course-57064",
  storageBucket: "fir-course-57064.appspot.com",
  messagingSenderId: "827319290390",
  appId: "1:827319290390:web:d4f6baba8b8b94a0944337",
  measurementId: "G-L0B156ZLT6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
 
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);