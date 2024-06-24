import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAmP9CYHuZT8VuQyYcZXvTh8a7FD0m9odg",
  authDomain: "app-xb.firebaseapp.com",
  projectId: "app-xb",
  storageBucket: "app-xb.appspot.com",
  messagingSenderId: "1062712088772",
  appId: "1:1062712088772:web:703724319ad3bb59cc5191"
};


const app = initializeApp(firebaseConfig);
let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}
const auth = getAuth(app);
const db = getFirestore(app);
const store = getStorage(app);
const provider = new GoogleAuthProvider();

export { db, store, auth, analytics, provider };
