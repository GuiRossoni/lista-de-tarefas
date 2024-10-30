import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Login({ setIsAuthenticated }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
                credentials: 'include',
            });
    
            const responseData = await response.json();
            if (response.ok) {
                setIsAuthenticated(true);
                console.log("Usuário autenticado com sucesso"); // Log para verificação
                setTimeout(() => navigate('/confirmacao'), 100); // Atraso para garantir atualização do estado
            } else {
                setError(responseData.error || 'Erro ao tentar fazer login');
            }
        } catch (error) {
            setError('Erro ao tentar fazer login');
        }
    };

    return (
        <Box>
            <Typography variant="h4">Login</Typography>
            <form onSubmit={handleLogin}>
                <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <TextField label="Senha" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                {error && <Typography color="error">{error}</Typography>}
                <Button type="submit">Login</Button>
            </form>
            <Button onClick={() => navigate('/cadastro')}>Cadastro</Button>
        </Box>
    );
}

export default Login;
