import React from 'react';
import { Box, Typography, Checkbox, IconButton } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { format } from 'date-fns';

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

export default Task;
