import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSignup = (e) => {
        e.preventDefault();
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                navigate('/tarefas');
            })
            .catch((error) => {
                setError(error.message);
            });
    };

    const handleBack = () => {
        navigate('/');
    };

    return (
        <Box className="page-container">
            <Box component="form" onSubmit={handleSignup} className="form-box">
                <Typography variant="h4" gutterBottom align="center">Cadastro</Typography>
                <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && <Typography color="error" align="center">{error}</Typography>}
                    <Button type="submit" variant="contained" style={{ marginTop: '10px' }} color="primary" fullWidth>
                        Cadastrar
                    </Button>
                    <Button variant="outlined" color="secondary" fullWidth style={{ marginTop: '10px' }} onClick={handleBack}>
                        Voltar
                    </Button>
                <Box className="header-text">
                    <Typography variant="body2" className="redirect-text">
                        Criado por Anne, Chiara, Guilherme e Rubens - 2024
                </Typography>
            </Box>
        </Box>
    </Box>
    );
}

export default SignUp;
