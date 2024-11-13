import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import firebaseService from '../firebase';

const auth = firebaseService.auth;

const AuthService = {
    login: (email, password) => signInWithEmailAndPassword(auth, email, password),
    signup: (email, password) => createUserWithEmailAndPassword(auth, email, password),
    onAuthStateChanged: (callback) => onAuthStateChanged(auth, callback)
};

export default AuthService;