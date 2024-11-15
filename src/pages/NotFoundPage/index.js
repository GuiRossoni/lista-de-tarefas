import React from 'react';
import { Box, Typography } from '@mui/material';
import useRedirectCountdown from '../../hooks/useRedirectCountdown';

function Erro() {
    // Usa o hook para redirecionar a página de erro após 5 segundos
    const seconds = useRedirectCountdown(5, '/');

    return (
        <Box className="page-container-error">
            <Box className="form-box-error" style={{ textAlign: 'center' }}>
                <Typography variant="h4" gutterBottom>Ops! Parece que essa página não existe</Typography>
                <Typography variant="body1">Você será redirecionado para a página de login em {seconds} segundos.</Typography>
            </Box>
        </Box>
    );
}

export default Erro;
