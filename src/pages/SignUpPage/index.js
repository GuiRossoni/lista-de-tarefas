import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../../components/AuthForm';
import ServiceFacade from '../../services/ServiceFacade';

function SignupPage() {
    // Define os estados para email, senha e erro
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Função para o cadastro
    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await ServiceFacade.signup(email, password);
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
