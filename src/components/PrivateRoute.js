import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';

function PrivateRoute({ element, ...rest }) {
    const { user } = useAuth();

    return (
        <Route
            {...rest}
            element={user ? element : <Navigate to="/" />}
        />
    );
}

export default PrivateRoute;
