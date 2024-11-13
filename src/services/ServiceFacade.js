import AuthService from './AuthService';
import TaskService from '../components/taskService';

class ServiceFacade {
    static async login(email, password) {
        return AuthService.login(email, password);
    }

    static async signup(email, password) {
        return AuthService.signup(email, password);
    }

    static async logout() {
        return AuthService.logout();
    }

    static async addTask(taskText, user) {
        return TaskService.addTask(taskText, user);
    }

    static async editTask(taskId, updatedText) {
        return TaskService.editTask(taskId, updatedText);
    }

    static async updateTaskStatus(taskId, isCompleted) {
        return TaskService.updateTaskStatus(taskId, isCompleted);
    }

    static async removeTask(taskId) {
        return TaskService.removeTask(taskId);
    }
}

export default ServiceFacade;