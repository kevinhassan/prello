import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import store, { history } from './store';
import App from './containers/app';

// Keep this import even if it's not used here: it's necessary for Dragula (Drag N Drop library)
import DragulaStyles from 'react-dragula/dist/dragula.min.css';

import 'sanitize.css/sanitize.css';
import './assets/generalStyle.css';

const target = document.querySelector('#root');

render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <div>
                <App />
            </div>
        </ConnectedRouter>
    </Provider>,
    target,
);
