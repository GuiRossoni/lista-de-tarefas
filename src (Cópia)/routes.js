import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import Tarefas from './pages/tarefas';
import Login from './pages/login';
import Cadastro from './pages/cadastro';
import Erro from './pages/erro';

function RoutesApp() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login onLoginSuccess={() => setUser(true)} />} />
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/tarefas" element={user ? <Tarefas /> : <Navigate to="/" />} />
                <Route path="*" element={<Erro />} />
            </Routes>
        </Router>
    );
}

export default RoutesApp;
