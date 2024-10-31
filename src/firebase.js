// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'; 

const firebaseConfig = {
  apiKey: "AIzaSyAXljCLWdUx3II2ObCBwaA_gmIU4RVPm0E",
  authDomain: "lista-de-tarefas-6a712.firebaseapp.com",
  projectId: "lista-de-tarefas-6a712",
  storageBucket: "lista-de-tarefas-6a712.firebasestorage.app",
  messagingSenderId: "79595629627",
  appId: "1:79595629627:web:c677c77f3d22a37736c01e"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { db, auth };
