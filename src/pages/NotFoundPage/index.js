import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Erro() {
    const [seconds, setSeconds] = useState(5);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setInterval(() => {
            setSeconds(prevSeconds => {
                if (prevSeconds <= 1) {
                    clearInterval(timer);
                    navigate('/');
                }
                return prevSeconds - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [navigate]);

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
                    textAlign: 'center',
                }}
            >
                <Typography variant="h4" gutterBottom>
                    Ops! Parece que essa página não existe
                </Typography>
                <Typography variant="body1">
                    Você será redirecionado para a página de login em {seconds} segundos.
                </Typography>
            </Box>
        </Box>
    );
}

export default Erro;
