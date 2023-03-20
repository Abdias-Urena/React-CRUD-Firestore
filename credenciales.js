// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBdc6LKtC4HbFvPSOzlFnGiYLHnlTt0rj8",
  authDomain: "tutorial-09-sdk-4a86f.firebaseapp.com",
  projectId: "tutorial-09-sdk-4a86f",
  storageBucket: "tutorial-09-sdk-4a86f.appspot.com",
  messagingSenderId: "739281233000",
  appId: "1:739281233000:web:8a3c3883e93b662315c7dd",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;

