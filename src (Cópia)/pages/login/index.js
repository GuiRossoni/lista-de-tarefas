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
                backgroundColor: '#faf0f0',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    maxWidth: '600px',
                    minWidth: '250px',
                    padding: '2rem',
                    boxShadow: 3,
                    borderRadius: 2,
                    backgroundColor: 'white',
                    position: 'relative',
                    zIndex: 1,
                    minHeight: '400px', // Garante que o box tenha altura mínima
                }}
            >
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
                </form>
                <Box
                    sx={{
                        marginTop: 'auto',
                        padding: '1rem',
                        textAlign: 'center',
                        borderTop: '1px solid #ddd',
                    }}
                >
                    <Typography variant="body2" color="textSecondary">
                        Criado por Anne e Guilherme - 2024
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}

export default Login;
