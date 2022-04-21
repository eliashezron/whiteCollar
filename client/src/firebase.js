// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAqSAdrKTQSVgTYy-sQTzSqKfVNzKYOdBA",
  authDomain: "whitekolla-c355b.firebaseapp.com",
  projectId: "whitekolla-c355b",
  storageBucket: "whitekolla-c355b.appspot.com",
  messagingSenderId: "760617971225",
  appId: "1:760617971225:web:1132e41d6ccd9150858488",
  measurementId: "G-KW3694MEMP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()
const db = getFirestore(app)
const storage = getStorage(app)

export { auth, provider, db, storage }