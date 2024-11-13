export function formatDate(timestamp) {
    if (!timestamp || !timestamp.seconds) {
        return 'Data inválida';
    }
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' });
}