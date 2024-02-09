// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCbkIclq6F5A8e2l7eabK2QpBrzqw28ues",
  authDomain: "edubyte-bf908.firebaseapp.com",
  projectId: "edubyte-bf908",
  storageBucket: "edubyte-bf908.appspot.com",
  messagingSenderId: "651921733449",
  appId: "1:651921733449:web:424d77331082d6c1a5cc98",
  measurementId: "G-4MLPYE8Z1B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const storage = getStorage(app);