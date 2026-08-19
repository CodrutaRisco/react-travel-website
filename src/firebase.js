import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDBgDlTGisOfjI6EnHVwhqii3YCzAWQ8gU",
  authDomain: "react-travel-website-fd67f.firebaseapp.com",
  projectId: "react-travel-website-fd67f",
  storageBucket: "react-travel-website-fd67f.firebasestorage.app",
  messagingSenderId: "445327488983",
  appId: "1:445327488983:web:de38d40157062402ac7d92",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);