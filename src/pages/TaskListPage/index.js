import React, { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import ServiceFacade from '../../services/ServiceFacade';
import TaskForm from '../../components/TaskForm';
import Task from '../../components/Task';
import firebaseService from '../../firebase';
import { onSnapshot, query, collection, orderBy } from 'firebase/firestore';
import '../../components/style.css';

const db = firebaseService.db;
const auth = firebaseService.auth;

function TaskListPage() {
    const [tasks, setTasks] = useState([]);
    const [editTask, setEditTask] = useState(null);
    const currentUser = auth.currentUser;

    useEffect(() => {
        const unsubscribe = onSnapshot(
            query(collection(db, 'tasks'), orderBy('timestamp', 'desc')),
            (snapshot) => {
                const tasksData = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),
                }));
                setTasks(tasksData);
            }
        );
        return () => unsubscribe();
    }, []);

    const handleAddTask = async (taskText) => {
        await ServiceFacade.addTask(taskText, currentUser);
    };

    const handleEditTask = async (taskText) => {
        await ServiceFacade.editTask(editTask.id, taskText);
        setEditTask(null);
    };

    const handleAddOrEditTask = async (taskText) => {
        if (editTask) {
            await handleEditTask(taskText);
        } else {
            await handleAddTask(taskText);
        }
    };

    const handleEdit = (task) => setEditTask(task);
    const handleDelete = async (id) => await ServiceFacade.removeTask(id);
    const handleToggleCompletion = async (id, isComplete) => await ServiceFacade.updateTaskStatus(id, !isComplete);

    const handleLogout = async () => {
        try {
            await ServiceFacade.logout();
            window.location.reload();
        } catch (error) {
            console.error("Logout error: ", error);
        }
    };

    return (
        <Box className="page-container">
            <Box className="form-box">
                <Typography variant="h4" gutterBottom align="center">Lista de Tarefas</Typography>
                <TaskForm
                    onSubmit={handleAddOrEditTask}
                    editTask={editTask}
                    clearEdit={() => setEditTask(null)}
                />
                <Box className="task-list">
                    <ul>
                        {tasks.map(task => (
                            <Task 
                                key={task.id} 
                                taskData={task} 
                                onEdit={() => handleEdit(task)}
                                onDelete={() => handleDelete(task.id)}
                                onToggleCompletion={() => handleToggleCompletion(task.id, task.data.completed)}
                            />
                        ))}
                    </ul>
                </Box>
                <Button variant="outlined" color="secondary" fullWidth onClick={handleLogout}>
                    Sair
                </Button>
                <Typography variant="body2" align="center" className="footer-text">
                    Criado por Anne, Chiara, Guilherme e Rubens - 2024
                </Typography>
            </Box>
        </Box>
    );
}

export default TaskListPage;
