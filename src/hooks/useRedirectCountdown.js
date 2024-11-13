import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function useRedirectCountdown(seconds, redirectTo) {
    const [countdown, setCountdown] = useState(seconds);
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setCountdown((prev) => prev - 1);
        }, 1000);

        if (countdown <= 0) {
            clearInterval(interval);
            navigate(redirectTo);
        }

        return () => clearInterval(interval);
    }, [countdown, navigate, redirectTo]);

    return countdown;
}

export default useRedirectCountdown;