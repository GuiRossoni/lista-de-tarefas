// pages/SignupPage.js
import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../../components/AuthForm';

function SignupPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        const auth = getAuth();
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            navigate('/tasks');
        } catch (err) {
            setError('Erro ao criar conta: ' + err.message);
        }
    };

    return (
        <AuthForm
            title="Cadastro"
            onSubmit={handleSignup}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            error={error}
            buttonText="Cadastrar"
            secondaryAction={{ onClick: () => navigate('/'), label: 'Voltar' }}
        />
    );
}

export default SignupPage;
