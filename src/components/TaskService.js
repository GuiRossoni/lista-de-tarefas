import { doc, updateDoc, serverTimestamp, addDoc, collection, deleteDoc } from 'firebase/firestore';
import firebaseService from '../firebase';
import TaskFactory from './taskFactory';

const db = firebaseService.db;

class TaskService {
    static async addTask(taskText, user) {
        const task = TaskFactory.createTask(taskText, user);
        try {
            await addDoc(collection(db, 'tasks'), task);
        } catch (error) {
            console.error("Error adding task:", error);
            throw new Error("Failed to add task.");
        }
    }

    static async editTask(taskId, updatedText) {
        if (!taskId || !updatedText) {
            throw new Error("Invalid task data.");
        }
        try {
            const taskRef = doc(db, 'tasks', taskId);
            await updateDoc(taskRef, {
                description: updatedText,
                timestamp: serverTimestamp(),
            });
        } catch (error) {
            console.error("Error editing task:", error);
            throw new Error("Failed to edit task.");
        }
    }

    static async updateTaskStatus(taskId, isCompleted) {
        if (!taskId) {
            throw new Error("Invalid task ID.");
        }
        try {
            const taskRef = doc(db, 'tasks', taskId);
            await updateDoc(taskRef, { completed: isCompleted });
        } catch (error) {
            console.error("Error updating task status:", error);
            throw new Error("Failed to update task status.");
        }
    }

    static async removeTask(taskId) {
        if (!taskId) {
            throw new Error("Invalid task ID.");
        }
        try {
            const taskRef = doc(db, 'tasks', taskId);
            await deleteDoc(taskRef);
        } catch (error) {
            console.error("Error removing task:", error);
            throw new Error("Failed to remove task.");
        }
    }
}

export default TaskService;