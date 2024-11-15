import { useState, useEffect } from 'react';

function useTaskForm(onSubmit, editTask, clearEdit) {
    // Define o estado para o input da tarefa
    const [taskInput, setTaskInput] = useState('');

    useEffect(() => {
        // Atualiza o input da tarefa quando a tarefa em edição muda
        if (editTask) {
            setTaskInput(editTask.data.description);
        } else {
            setTaskInput('');
        }
    }, [editTask]);

    // Função para o envio do formulário
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(taskInput);
        setTaskInput('');
        if (clearEdit) clearEdit();
    };

    return {
        taskInput,
        setTaskInput,
        handleSubmit
    };
}

export default useTaskForm;