import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthService from './services/AuthService';

import TaskListPage from './pages/TaskListPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import NotFoundPage from './pages/NotFoundPage';

function AppRoutes() {
    // Define os estados para o usuário atual e o estado de carregamento
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Monitora mudanças no estado de autenticação
        const unsubscribe = AuthService.onAuthStateChanged((user) => {
            setCurrentUser(user);
            setIsLoading(false);
        });

        // Limpa a assinatura quando o componente é desmontado
        return () => unsubscribe();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage onLoginSuccess={() => setCurrentUser(true)} />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/tasks" element={currentUser ? <TaskListPage /> : <Navigate to="/" />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Router>
    );
}

export default AppRoutes;
