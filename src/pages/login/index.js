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
            .then((userCredential) => {
                navigate('/tarefas');
            })
            .catch((error) => {
                setError(error.message);
            });
    };

    const handleSignupRedirect = () => {
        navigate('/cadastro');
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                padding: '0 20%',
                position: 'relative',
                backgroundColor: '#faf0f0',
            }}
        >
            <Box
                component="form"
                onSubmit={handleLogin}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    maxWidth: '400px',
                    minWidth: '250px',
                    padding: '2rem',
                    boxShadow: 3,
                    borderRadius: 2,
                    backgroundColor: 'white',
                    position: 'relative',
                    zIndex: 1,
                }}
            >
                <Typography variant="h4" gutterBottom align="center">Lista de Tarefas</Typography>
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
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Login
                </Button>
                <Button
                    variant="outlined"
                    color="secondary"
                    fullWidth
                    style={{ marginTop: '10px' }}
                    onClick={handleSignupRedirect}
                >
                    Cadastro
                </Button>
            </Box>
        </Box>
    );
}

export default Login;
