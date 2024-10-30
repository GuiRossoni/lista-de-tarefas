import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Cadastro() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/cadastro', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
                credentials: 'include',
            });
            if (response.ok) {
                navigate('/');
            } else {
                setError('Erro ao tentar fazer cadastro');
            }
        } catch (error) {
            setError('Erro ao tentar fazer cadastro');
        }
    };

    return (
        <Box>
            <Typography variant="h4">Cadastro</Typography>
            <form onSubmit={handleSignup}>
                <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <TextField label="Senha" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                {error && <Typography color="error">{error}</Typography>}
                <Button type="submit">Cadastrar</Button>
            </form>
        </Box>
    );
}

export default Cadastro;
