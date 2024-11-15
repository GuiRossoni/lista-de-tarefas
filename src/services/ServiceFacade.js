import AuthService from './AuthService';
import TaskService from './TaskService';

class ServiceFacade {
    // Função para login
    static async login(email, password) {
        return AuthService.login(email, password);
    }

    // Função para cadastro
    static async signup(email, password) {
        return AuthService.signup(email, password);
    }

    // Função para logout
    static async logout() {
        return AuthService.logout();
    }

    // Função para adicionar uma nova tarefa
    static async addTask(taskText, user) {
        return TaskService.addTask(taskText, user);
    }

    // Função para editar uma tarefa existente
    static async editTask(taskId, updatedText) {
        return TaskService.editTask(taskId, updatedText);
    }

    // Função para atualizar o status de conclusão de uma tarefa
    static async updateTaskStatus(taskId, isCompleted) {
        return TaskService.updateTaskStatus(taskId, isCompleted);
    }

    // Função para remover uma tarefa
    static async removeTask(taskId) {
        return TaskService.removeTask(taskId);
    }
}

export default ServiceFacade;