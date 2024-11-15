import React from 'react';
import { TextField, Button } from '@mui/material';
import useTaskForm from '../hooks/useTaskForm';

function TaskForm({ onSubmit, editTask, clearEdit }) {
    // Usa o hook useTaskForm para gerenciar o estado do formulário
    const { taskInput, setTaskInput, handleSubmit } = useTaskForm(onSubmit, editTask, clearEdit);

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
