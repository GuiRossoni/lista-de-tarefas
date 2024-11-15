import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import firebaseService from '../firebase';

// Inicializa a autenticação do Firebase
const auth = firebaseService.auth;

const AuthService = {
    // Função para login com email e senha
    login: (email, password) => signInWithEmailAndPassword(auth, email, password),

    // Função para cadastro com email e senha
    signup: (email, password) => createUserWithEmailAndPassword(auth, email, password),

    // Função para monitorar mudanças no estado de autenticação
    onAuthStateChanged: (callback) => onAuthStateChanged(auth, callback),

    // Função para logout
    logout: () => signOut(auth)
};

export default AuthService;