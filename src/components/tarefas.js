import React, { useState } from 'react';
import { List, ListItem, ListItemAvatar, ListItemText, Checkbox, IconButton, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { format } from 'date-fns';
import './style.css';
import { db } from "../firebase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";

const Tarefa = ({ arr }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(arr?.item?.tarefa || '');

  if (!arr || !arr.item) {
    return null;
  }

  const { tarefa, createdBy, timestamp, completed } = arr.item;
  const formattedDate = timestamp
    ? format(new Date(timestamp.seconds * 1000), 'dd/MM/yyyy HH:mm:ss')
    : 'Date unknown';

  const handleToggleComplete = async () => {
    const tarefaRef = doc(db, "tarefas", arr.id);
    await updateDoc(tarefaRef, { completed: !completed });
  };

  const handleSaveEdit = async () => {
    const tarefaRef = doc(db, "tarefas", arr.id);
    await updateDoc(tarefaRef, { tarefa: editText });
    setIsEditing(false);
  };

  return (
    <List className="lista" sx={{ marginBottom: 2 }}>
      <ListItem>
        <ListItemAvatar>
          <Checkbox
            checked={completed || false}
            onChange={handleToggleComplete}
            color="primary"
          />
        </ListItemAvatar>
        {isEditing ? (
          <TextField
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            fullWidth
          />
        ) : (
          <ListItemText 
            primary={tarefa} 
            secondary={`Tarefa Criada por: ${createdBy} em ${formattedDate}`} 
          />
        )}
        <IconButton
          edge="end"
          aria-label="edit"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? <SaveIcon onClick={handleSaveEdit} /> : <EditIcon />}
        </IconButton>
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={() => {
            deleteDoc(doc(db, "tarefas", arr.id));
          }}
        >
          <DeleteIcon fontSize="large" style={{ opacity: 0.7 }} />
        </IconButton>
      </ListItem>
    </List>
  );
};

export default Tarefa;
