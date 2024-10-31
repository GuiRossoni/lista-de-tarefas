// PrivateRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';

function PrivateRoute({ element, ...rest }) {
    const auth = getAuth();
    const user = auth.currentUser;

    return (
        <Route
            {...rest}
            element={user ? element : <Navigate to="/" />}
        />
    );
}

export default PrivateRoute;
