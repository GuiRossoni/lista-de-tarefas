import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Checkbox, IconButton } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import TaskService from '../../components/taskFactory';
import firebaseService from '../../firebase';
import { onSnapshot, query, collection, orderBy } from 'firebase/firestore';
import '../../components/style.css';
import { format } from 'date-fns';

const db = firebaseService.db;
const auth = firebaseService.auth;

function observeTasks(setTasks) {
    const tasksQuery = query(collection(db, 'tasks'), orderBy('timestamp', 'desc'));
    return onSnapshot(tasksQuery, (snapshot) => {
        setTasks(snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data()
        })));
    });
}

function TaskListPage() {
    const [tasks, setTasks] = useState([]);
    const [taskInput, setTaskInput] = useState('');
    const [editTaskId, setEditTaskId] = useState(null);
    const [editTaskInput, setEditTaskInput] = useState('');
    const currentUser = auth.currentUser;

    useEffect(() => {
        const unsubscribe = observeTasks(setTasks);
        return () => unsubscribe();
    }, []);

    const handleAddOrEditTask = async (e) => {
        e.preventDefault();
        if (editTaskId) {
            await TaskService.editTask(editTaskId, editTaskInput);
            setEditTaskId(null);
            setEditTaskInput('');
        } else {
            await TaskService.addTask(taskInput, currentUser);
            setTaskInput('');
        }
    };

    const handleEdit = (id, currentText) => {
        setEditTaskId(id);
        setEditTaskInput(currentText);
    };

    const handleDelete = async (id) => {
        await TaskService.removeTask(id);
    };

    const handleToggleCompletion = async (id, isComplete) => {
        await TaskService.updateTaskStatus(id, !isComplete);
    };

    const handleLogout = async () => {
        try {
            await auth.signOut();
            window.location.reload();
        } catch (error) {
            console.error("Logout error: ", error);
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
                <form onSubmit={handleAddOrEditTask}>
                    <TextField
                        label={editTaskId ? "Editar Tarefa" : "Adicionar Tarefa"}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        size="small"
                        value={editTaskId ? editTaskInput : taskInput}
                        onChange={e => editTaskId ? setEditTaskInput(e.target.value) : setTaskInput(e.target.value)}
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        {editTaskId ? "Salvar" : "Adicionar"}
                    </Button>
                </form>
                <Box sx={{ marginTop: 2 }}>
                    <ul>
                        {tasks.map(task => (
                            <Task 
                                key={task.id} 
                                taskData={task} 
                                onEdit={() => handleEdit(task.id, task.data.description)}
                                onDelete={() => handleDelete(task.id)}
                                onToggleCompletion={() => handleToggleCompletion(task.id, task.data.completed)}
                            />
                        ))}
                    </ul>
                </Box>
                <Box sx={{ marginTop: 2 }}>
                    <Button variant="outlined" color="secondary" fullWidth onClick={handleLogout}>
                        Logout
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
                        Criado por Anne, Chiara, Guilherme e Rubens - 2024
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}

function Task({ taskData, onEdit, onDelete, onToggleCompletion }) {
    const formattedDate = taskData.data.timestamp && taskData.data.timestamp.seconds
        ? format(new Date(taskData.data.timestamp.seconds * 1000), 'dd/MM/yyyy HH:mm')
        : 'Data desconhecida';

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
                backgroundColor: taskData.data.completed ? '#e0ffe0' : '#ffffff',
            }}
        >
            <Checkbox
                checked={taskData.data.completed || false}
                onChange={onToggleCompletion}
                color="primary"
            />
            <Box sx={{ flex: 1 }}>
                <Typography variant="body1" sx={{ textDecoration: taskData.data.completed ? 'line-through' : 'none' }}>
                    {taskData.data.description}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                    Criado por: {taskData.data.createdBy} em {formattedDate}
                </Typography>
            </Box>
            <IconButton onClick={onEdit} color="primary">
                <Edit />
            </IconButton>
            <IconButton onClick={onDelete} color="secondary">
                <Delete />
            </IconButton>
        </Box>
    );
}

export default TaskListPage;
