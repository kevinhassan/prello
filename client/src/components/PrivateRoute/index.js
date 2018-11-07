import React from 'react';
import {
    Route,
    Redirect,
} from 'react-router-dom';

// Source for this component:
// https://stackoverflow.com/questions/43164554/how-to-implement-authenticated-routes-in-react-router-4/43171515#43171515
const PrivateRoute = ({ component: Component, authed, ...rest }) => (
    <Route
        {...rest}
        render={props => (authed === true
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/', state: { from: props.location } }} />)}
    />
);

export default PrivateRoute;
