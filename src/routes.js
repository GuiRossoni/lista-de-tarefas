import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Confirmacao from './pages/confirmacao';
import Login from './pages/login';
import Cadastro from './pages/cadastro';
import Erro from './pages/erro';

function RoutesApp() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Verifica a autenticação quando o app é carregado
        fetch('/auth/check', { credentials: 'include' })
            .then(response => setIsAuthenticated(response.status === 200))
            .catch(() => setIsAuthenticated(false));
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/confirmacao" element={isAuthenticated ? <Confirmacao /> : <Navigate to="/" />} />
                <Route path="*" element={<Erro />} />
            </Routes>
        </Router>
    );
}

export default RoutesApp;
