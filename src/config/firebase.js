
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD7zcp7hs_kWX9C3ieS8u7Wz2lDD7h58Xc",
  authDomain: "blog-app-emc-7acb3.firebaseapp.com",
  projectId: "blog-app-emc-7acb3",
  storageBucket: "blog-app-emc-7acb3.firebasestorage.app",
  messagingSenderId: "701159240079",
  appId: "1:701159240079:web:dfe9270b34a72943fd1bfa"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)


export default auth