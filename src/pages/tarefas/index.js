// tarefas/index.js
import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Checkbox, IconButton } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import TaskFactory from '../../taskfactory'; // Factory para criação e atualização de tarefas
import firebaseService from '../../firebase'; // Singleton para instância única do Firebase
import { onSnapshot, query, collection, orderBy } from 'firebase/firestore';
import '../../components/style.css';

const db = firebaseService.db;
const auth = firebaseService.auth;

// Observer - Função para monitorar mudanças em tempo real na coleção 'tarefas'
function observeTasks(setTarefas) {
    const tarefasQuery = query(collection(db, 'tarefas'), orderBy('timestamp', 'desc'));
    return onSnapshot(tarefasQuery, (snapshot) => {
        setTarefas(snapshot.docs.map((doc) => ({
            id: doc.id,
            item: doc.data()
        })));
    });
}

function Tarefas() {
    const [tarefas, setTarefas] = useState([]);
    const [input, setInput] = useState('');
    const [editId, setEditId] = useState(null);
    const [editInput, setEditInput] = useState('');
    const user = auth.currentUser;

    useEffect(() => {
        const unsubscribe = observeTasks(setTarefas);
        return () => unsubscribe();
    }, []);

    // Adiciona ou atualiza uma tarefa usando o padrão Factory
    const addTarefa = async (e) => {
        e.preventDefault();
        if (editId) {
            await TaskFactory.updateTask(editId, editInput);
            setEditId(null);
            setEditInput('');
        } else {
            await TaskFactory.createTask(input, user);
            setInput('');
        }
    };

    const handleEdit = (id, currentText) => {
        setEditId(id);
        setEditInput(currentText);
    };

    const handleDelete = async (id) => {
        await TaskFactory.deleteTask(id);
    };

    const handleToggleCompletion = async (id, isComplete) => {
        await TaskFactory.updateTaskCompletion(id, !isComplete);
    };

    const handleLogout = async () => {
        try {
            await auth.signOut();
            window.location.reload();
        } catch (error) {
            console.error("Erro ao sair: ", error);
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
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
                    padding: '2rem',
                    boxShadow: 3,
                    borderRadius: 2,
                    backgroundColor: 'white',
                    position: 'relative',
                    zIndex: 1,
                    minHeight: '400px',
                }}
            >
                <Typography variant="h4" gutterBottom align="center">Lista de Tarefas</Typography>
                <form onSubmit={addTarefa}>
                    <TextField
                        label={editId ? "Editar Tarefa" : "Adicionar Tarefa"}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        size="small"
                        value={editId ? editInput : input}
                        onChange={e => editId ? setEditInput(e.target.value) : setInput(e.target.value)}
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        {editId ? "Salvar Edição" : "Adicionar Tarefa"}
                    </Button>
                </form>
                <Box sx={{ marginTop: 2 }}>
                    <ul>
                        {tarefas.map(item => (
                            <Tarefa 
                                key={item.id} 
                                arr={item} 
                                onEdit={() => handleEdit(item.id, item.item.tarefa)}
                                onDelete={() => handleDelete(item.id)}
                                onToggleCompletion={() => handleToggleCompletion(item.id, item.item.completed)}
                            />
                        ))}
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
                        Criado por Anne, Chiara e Guilherme - 2024
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}

// Componente Tarefa para renderizar cada item da lista de tarefas
function Tarefa({ arr, onEdit, onDelete, onToggleCompletion }) {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.5rem',
                margin: '0.5rem 0',
                boxShadow: 1,
                borderRadius: 1,
                backgroundColor: arr.item.completed ? '#e0ffe0' : '#ffffff',
            }}
        >
            <Checkbox
                checked={arr.item.completed || false}
                onChange={onToggleCompletion}
                color="primary"
            />
            <Typography variant="body1" sx={{ textDecoration: arr.item.completed ? 'line-through' : 'none', flex: 1 }}>
                {arr.item.tarefa}
            </Typography>
            <IconButton onClick={onEdit} color="primary">
                <Edit />
            </IconButton>
            <IconButton onClick={onDelete} color="secondary">
                <Delete />
            </IconButton>
        </Box>
    );
}

export default Tarefas;
