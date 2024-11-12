import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';

function TaskForm({ onSubmit, editTask, clearEdit }) {
    const [taskInput, setTaskInput] = useState('');

    useEffect(() => {
        if (editTask) setTaskInput(editTask.data.description);
    }, [editTask]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(taskInput);
        setTaskInput('');
        if (editTask) clearEdit();
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label={editTask ? "Editar Tarefa" : "Adicionar Tarefa"}
                variant="outlined"
                fullWidth
                margin="normal"
                size="small"
                value={taskInput}
                onChange={(e) => setTaskInput(e.target.value)}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
                {editTask ? "Salvar" : "Adicionar"}
            </Button>
        </form>
    );
}

export default TaskForm;
