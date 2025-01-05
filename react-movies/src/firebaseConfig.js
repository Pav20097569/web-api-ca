import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
  apiKey: "AIzaSyDP5b3F011F0Wh9vaPcBjOvVAqg3SevHzc",
  authDomain: "react-movie-labs-9d14e.firebaseapp.com",
  projectId: "react-movie-labs-9d14e",
  storageBucket: "react-movie-labs-9d14e.firebasestorage.app",
  messagingSenderId: "591498299641",
  appId: "1:591498299641:web:4dafd930bd14aebf77fa28",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
