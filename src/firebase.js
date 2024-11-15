import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCXY1EACn5FdmZwUrPOdTP4u-dSG7lfRJw",
    authDomain: "lista-de-tarefas-a7d89.firebaseapp.com",
    projectId: "lista-de-tarefas-a7d89",
    storageBucket: "lista-de-tarefas-a7d89.appspot.com",
    messagingSenderId: "932668065129",
    appId: "1:932668065129:web:67c253dbe573e9521129f8",
};

class FirebaseService {
    constructor() {
        // Implementa o padrão Singleton para garantir que apenas uma instância do FirebaseService seja criada
        if (!FirebaseService.instance) {
            const app = initializeApp(firebaseConfig);
            this.auth = getAuth(app);
            this.db = getFirestore(app);
            FirebaseService.instance = this;
        }
        return FirebaseService.instance;
    }
}

// Cria uma instância única do FirebaseService
const instance = new FirebaseService();
Object.freeze(instance);

export default instance;
