// components/AuthForm.js
import React from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

function AuthForm({
    title,
    onSubmit,
    email,
    setEmail,
    password,
    setPassword,
    error,
    buttonText,
    secondaryAction
}) {
    return (
        <Box className="page-container">
            <Box className="form-box">
                <Typography variant="h4" gutterBottom align="center">{title}</Typography>
                <form onSubmit={onSubmit}>
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
                            {buttonText}
                        </Button>
                    {secondaryAction && (
                        <Button variant="outlined" color="secondary" fullWidth style={{ marginTop: '10px' }} onClick={secondaryAction.onClick}>
                            {secondaryAction.label}
                        </Button>
                        
                    )}
                    <Typography variant="body2" className="footer-text">
                        Criado por Anne, Chiara, Guilherme e Rubens - 2024
                    </Typography>
                </form>
            </Box>
        </Box>
    );
}

export default AuthForm;
