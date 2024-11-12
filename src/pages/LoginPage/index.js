import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                navigate('/tasks');
            })
            .catch((error) => {
                setError(error.message);
            });
    };

    const handleSignupRedirect = () => {
        navigate('/signup');
    };

    return (
        <Box className="page-container">
            <Box className="form-box">
                <Typography variant="h4" gutterBottom align="center">Lista de Tarefas</Typography>
                <form onSubmit={handleLogin}>
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
                    {error && <Typography color="error">{error}</Typography>}
                    <Button type="submit" variant="contained" style={{ marginTop: '10px' }} color="primary" fullWidth>
                        Login
                    </Button>
                    <Button variant="outlined" color="secondary" fullWidth style={{ marginTop: '10px' }} onClick={handleSignupRedirect}>
                        Cadastro
                    </Button>
                </form>
                <Box className="header-text">
                    <Typography variant="body2" className="redirect-text">
                        Criado por Anne, Chiara, Guilherme e Rubens - 2024
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}

export default Login;
