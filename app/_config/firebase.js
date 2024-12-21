// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_ZAX-revoz34P5iMnLAtHyey09k_M4_I",
  authDomain: "fastfoodecommerce.firebaseapp.com",
  projectId: "fastfoodecommerce",
  storageBucket: "fastfoodecommerce.appspot.com",
  messagingSenderId: "146596695929",
  appId: "1:146596695929:web:1c7cdc0d0fdd51bb80e9a8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };

export default app;
