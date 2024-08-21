import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getFirestore, collection, addDoc , getDocs , deleteDoc , doc , updateDoc} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCZRWMNoD7Sa9yYlT6zwUmv5HK5C6jm828",
    authDomain: "todo-app-35277.firebaseapp.com",
    projectId: "todo-app-35277",
    storageBucket: "todo-app-35277.appspot.com",
    messagingSenderId: "244094199372",
    appId: "1:244094199372:web:d26ea4a4e725a49f2e36e9",
    measurementId: "G-JQ876Y14JG"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc , getFirestore , getDocs , deleteDoc ,doc ,updateDoc };
