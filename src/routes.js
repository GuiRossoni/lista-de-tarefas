import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Tarefas from './pages/tarefas';
import Login from './pages/login';
import Cadastro from './pages/cadastro';
import Erro from './pages/erro';

function RoutesApp() {
    const [isAuthenticated, setIsAuthenticated] = useState(
        sessionStorage.getItem('isLoggedIn') === 'true' && !!Cookies.get('authToken')
    );

    useEffect(() => {
        const handleAuthChange = () => {
            const authToken = Cookies.get('authToken');
            setIsAuthenticated(!!authToken && sessionStorage.getItem('isLoggedIn') === 'true');
        };

        window.addEventListener('storage', handleAuthChange);
        handleAuthChange();

        return () => {
            window.removeEventListener('storage', handleAuthChange);
        };
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/tarefas" element={isAuthenticated ? <Tarefas /> : <Navigate to="/" />} />
                <Route path="*" element={<Erro />} />
            </Routes>
        </Router>
    );
}

export default RoutesApp;
