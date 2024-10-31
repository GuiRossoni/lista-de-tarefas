import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function PrivateRoute({ element, ...rest }) {
    const authToken = Cookies.get('authToken');

    return (
        <Route
            {...rest}
            element={authToken ? element : <Navigate to="/" />}
        />
    );
}

export default PrivateRoute;
