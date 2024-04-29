// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDMr2pMY-KPeVEVq6er_F0Byo83MtgFFU0",
  authDomain: "realtor-clone-9bcc2.firebaseapp.com",
  projectId: "realtor-clone-9bcc2",
  storageBucket: "realtor-clone-9bcc2.appspot.com",
  messagingSenderId: "904205620717",
  appId: "1:904205620717:web:6066f3bce3cd3449f183e4",
  measurementId: "G-C221W4X1Q2"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore()