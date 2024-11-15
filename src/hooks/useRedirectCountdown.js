import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function useRedirectCountdown(seconds, redirectTo) {
    // Define o estado para o contador
    const [countdown, setCountdown] = useState(seconds);
    const navigate = useNavigate();

    useEffect(() => {
        // Define um intervalo para diminuir o contador a cada segundo
        const interval = setInterval(() => {
            setCountdown((prev) => prev - 1);
        }, 1000);

        // Redireciona quando o contador chega a zero
        if (countdown <= 0) {
            clearInterval(interval);
            navigate(redirectTo);
        }

        // Limpa o intervalo quando o componente é desmontado
        return () => clearInterval(interval);
    }, [countdown, navigate, redirectTo]);

    return countdown;
}

export default useRedirectCountdown;