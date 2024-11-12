import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../../components/AuthForm';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const auth = getAuth();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/tasks');
        } catch (err) {
            setError('Erro ao fazer login: ' + err.message);
        }
    };

    return (
        <AuthForm
            title="Lista de Tarefas"
            onSubmit={handleLogin}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            error={error}
            buttonText="Login"
            secondaryAction={{ onClick: () => navigate('/signup'), label: 'Cadastro' }}
        />
    );
}

export default LoginPage;
