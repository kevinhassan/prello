import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import store, { history } from './store';
import App from './containers/app';

import 'sanitize.css/sanitize.css';
import './assets/generalStyle.css';

const target = document.querySelector('#root');

render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <div style={{ height: '100%' }}>
                <App />
            </div>
        </ConnectedRouter>
    </Provider>,
    target,
);
