import { useState, useEffect } from 'react';

function useTaskForm(onSubmit, editTask, clearEdit) {
    const [taskInput, setTaskInput] = useState('');

    useEffect(() => {
        if (editTask) {
            setTaskInput(editTask.data.description);
        } else {
            setTaskInput('');
        }
    }, [editTask]);

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