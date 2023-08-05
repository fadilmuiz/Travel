// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBc4_dv65ZBR1HPBaGbthVhCVdEkGDQAMk",
  authDomain: "final-project-b8ec3.firebaseapp.com",
  projectId: "final-project-b8ec3",
  storageBucket: "final-project-b8ec3.appspot.com",
  messagingSenderId: "817182846368",
  appId: "1:817182846368:web:ca1003793c4fc6170508c5"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp