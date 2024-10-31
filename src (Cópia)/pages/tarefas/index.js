import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import Tarefa from '../../components/tarefas';
import { db } from '../../firebase';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { getAuth, signOut } from 'firebase/auth';
import '../../components/style.css';

const q = query(collection(db, 'tarefas'), orderBy('timestamp', 'desc'));

function Tarefas() {
    const [Tarefas, setTarefas] = useState([]);
    const [input, setInput] = useState('');

    useEffect(() => {
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setTarefas(snapshot.docs.map(doc => ({
                id: doc.id,
                item: doc.data()
            })));
        });
        return () => unsubscribe();
    }, [input]);

    const addTarefa = (e) => {
        e.preventDefault();
        const auth = getAuth();
        const user = auth.currentUser;
        addDoc(collection(db, 'tarefas'), {
            tarefa: input,
            timestamp: serverTimestamp(),
            createdBy: user ? user.email : 'unknown'
        });
        setInput('');
    };

    const handleLogout = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            console.log("Logged out successfully");
        }).catch((error) => {
            console.error("Error logging out: ", error);
        });
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
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
                <form onSubmit={addTarefa}>
                    <TextField
                        id="outlined-basic"
                        label="Inserir Tarefa"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        size="small"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Adicionar Tarefa
                    </Button>
                </form>
                <Box sx={{ marginTop: 2 }}>
                    <ul>
                        {Tarefas.map(item => <Tarefa key={item.id} arr={item} />)}
                    </ul>
                </Box>
                <Box sx={{ marginTop: 2 }}>
                    <Button variant="outlined" color="secondary" fullWidth onClick={handleLogout}>
                        Sair
                    </Button>
                </Box>
                <Box
                    sx={{
                        marginTop: 'auto',
                        padding: '1rem',
                        textAlign: 'center',
                        borderTop: '1px solid #ddd',
                    }}
                >
                    <Typography variant="body2" color="textSecondary" sx={{ marginBottom: '0.5rem' }}>
                        Criado por Anne e Guilherme - 2024
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}

export default Tarefas;
