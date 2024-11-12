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
        <Box className="page-container">
            <Box className="form-box">
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
                <Box className="task-list">
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
                <Button variant="outlined" color="secondary" fullWidth className="logout-btn" onClick={handleLogout}>
                    Logout
                </Button>
                <Box className="header-text">
                    <Typography variant="body2" className="redirect-text">
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
        <Box className={`task-item ${taskData.data.completed ? 'completed' : ''}`}>
            <Checkbox
                checked={taskData.data.completed || false}
                onChange={onToggleCompletion}
                color="primary"
            />
            <Box className="task-text">
                <Typography variant="body1" className={`task-text ${taskData.data.completed ? 'completed' : ''}`}>
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
