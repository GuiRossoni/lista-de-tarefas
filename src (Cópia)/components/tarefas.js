import React from 'react';
import { List, ListItem, ListItemAvatar, ListItemText, Checkbox } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { format } from 'date-fns';
import './style.css';
import { db } from "../firebase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";

const Tarefa = ({ arr }) => {
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
        <ListItemText 
          primary={tarefa} 
          secondary={`Tarefa Criada por: ${createdBy} em ${formattedDate}`} // Adiciona a data de criação
        />
      </ListItem>
      <DeleteIcon
        fontSize="large"
        style={{ opacity: 0.7 }}
        onClick={() => {
          deleteDoc(doc(db, "tarefas", arr.id));
        }}
      />
    </List>
  );
};

export default Tarefa;
