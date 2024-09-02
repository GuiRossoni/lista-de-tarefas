// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'; 

const firebaseConfig = {
    apiKey: "AIzaSyCXY1EACn5FdmZwUrPOdTP4u-dSG7lfRJw",
    authDomain: "lista-de-tarefas-a7d89.firebaseapp.com",
    projectId: "lista-de-tarefas-a7d89",
    storageBucket: "lista-de-tarefas-a7d89.appspot.com",
    messagingSenderId: "932668065129",
    appId: "1:932668065129:web:67c253dbe573e9521129f8",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { db, auth };
