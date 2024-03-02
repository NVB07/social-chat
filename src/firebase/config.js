// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBDkYXz632FuMUvdu8V31uLcw6uTYDsJ3I",
    authDomain: "social-chat-d2b4e.firebaseapp.com",
    projectId: "social-chat-d2b4e",
    storageBucket: "social-chat-d2b4e.appspot.com",
    messagingSenderId: "315301649530",
    appId: "1:315301649530:web:274ef57567578801c3afc3",
    measurementId: "G-LEX5WSKQVV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// const analytics = getAnalytics(app);
const storage = getStorage(app);
const database = getDatabase(app);
const fireStore = getFirestore(app);
const auth = getAuth(app);
export { database, storage, auth, fireStore };
