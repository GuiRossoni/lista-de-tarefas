import { doc, updateDoc, serverTimestamp, addDoc, collection, deleteDoc } from 'firebase/firestore';
import firebaseService from '../firebase';

const db = firebaseService.db;

class TaskService {
    static async addTask(taskText, user) {
        try {
            const task = {
                description: taskText,
                userId: user.uid,
                createdBy: user.displayName || user.email, // Nome ou email do criador
                timestamp: serverTimestamp(),
                completed: false,
            };
            await addDoc(collection(db, 'tasks'), task);
        } catch (error) {
            console.error("Error adding task:", error);
            throw new Error("Failed to add task.");
        }
    }

    static async editTask(taskId, updatedText) {
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
        try {
            const taskRef = doc(db, 'tasks', taskId);
            await updateDoc(taskRef, { completed: isCompleted });
        } catch (error) {
            console.error("Error updating task status:", error);
            throw new Error("Failed to update task status.");
        }
    }

    static async removeTask(taskId) {
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
