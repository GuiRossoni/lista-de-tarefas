import { serverTimestamp } from 'firebase/firestore';

class TaskFactory {
    // Função para criar uma nova tarefa
    static createTask(taskText, user) {
        if (!taskText || !user) {
            throw new Error("Invalid task data.");
        }
        return {
            description: taskText,
            userId: user.uid,
            createdBy: user.displayName || user.email,
            timestamp: serverTimestamp(),
            completed: false,
        };
    }
}

export default TaskFactory;