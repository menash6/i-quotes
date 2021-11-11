import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDfQPnEd3IOtWdDh9Abr1Kg8TtDOGwdKZA",
  authDomain: "iquotes-dd0ad.firebaseapp.com",
  databaseURL: "https://iquotes-dd0ad-default-rtdb.firebaseio.com/",
  projectId: "iquotes-dd0ad",
  storageBucket: "iquotes-dd0ad.appspot.com",
  messagingSenderId: "743947428082",
  appId: "1:743947428082:web:f078f0e0c0723cdc58f06b",
//   measurementId: "G-4YWVBN3HTK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const database = getDatabase(app);
export const storage  = getStorage(app);

