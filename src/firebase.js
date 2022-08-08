import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAmyz0SbWDpgJK7FDVxu87UT9Rpd2OpjZo",
  authDomain: "chuks-todo-app.firebaseapp.com",
  projectId: "chuks-todo-app",
  storageBucket: "chuks-todo-app.appspot.com",
  messagingSenderId: "777277265690",
  appId: "1:777277265690:web:88e407690820f4215afea3",
  measurementId: "G-PTMBQYM4ZV"
};


const app = initializeApp(firebaseConfig);

// const analytics = getAnalytics(app);

const db = getFirestore(app);

export default db;
