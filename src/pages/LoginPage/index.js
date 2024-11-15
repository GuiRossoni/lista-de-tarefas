import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../../components/AuthForm';
import ServiceFacade from '../../services/ServiceFacade';

function LoginPage() {
    // Define os estados para email, senha e erro
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Função de login
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await ServiceFacade.login(email, password);
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
