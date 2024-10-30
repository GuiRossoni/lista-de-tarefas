import React from 'react';
import { Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Confirmacao() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        await fetch('http://localhost:5000/logout', { method: 'POST', credentials: 'include' });
        navigate('/');
    };

    return (
        <Box>
            <Typography variant="h5">Usuário logado com sucesso</Typography>
            <Button onClick={handleLogout}>Sair</Button>
        </Box>
    );
}

export default Confirmacao;
