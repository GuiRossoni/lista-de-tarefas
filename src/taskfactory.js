import { doc, updateDoc, serverTimestamp, addDoc, collection, deleteDoc } from 'firebase/firestore';
import firebaseService from './firebase';

const db = firebaseService.db;

class TaskFactory {
    static async createTask(taskText, user) {
        try {
            const tarefa = {
                tarefa: taskText,
                userId: user.uid,
                timestamp: serverTimestamp(),
                completed: false,
            };
            await addDoc(collection(db, 'tarefas'), tarefa);
        } catch (error) {
            console.error("Error creating task:", error);
            throw new Error("Failed to create task.");
        }
    }

    static async updateTask(taskId, newText) {
        try {
            const taskRef = doc(db, 'tarefas', taskId);
            await updateDoc(taskRef, {
                tarefa: newText,
                timestamp: serverTimestamp(),
            });
        } catch (error) {
            console.error("Error updating task:", error);
            throw new Error("Failed to update task.");
        }
    }

    static async updateTaskCompletion(taskId, isCompleted) {
        try {
            const taskRef = doc(db, 'tarefas', taskId);
            await updateDoc(taskRef, {
                completed: isCompleted,
            });
        } catch (error) {
            console.error("Error updating task completion:", error);
            throw new Error("Failed to update task completion.");
        }
    }

    static async deleteTask(taskId) {
        try {
            const taskRef = doc(db, 'tarefas', taskId);
            await deleteDoc(taskRef);
        } catch (error) {
            console.error("Error deleting task:", error);
            throw new Error("Failed to delete task.");
        }
    }
}

export default TaskFactory;
