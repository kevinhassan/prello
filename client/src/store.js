import { createStore, applyMiddleware, compose } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import rootReducer from './reducers';
import logger from './middlewares/logger';

export const history = createHistory();

const initialState = {};
const enhancers = [];
const middleware = [thunk, routerMiddleware(history), logger];

if (process.env.ENVIRONMENT === 'development') {
    /* eslint-disable no-underscore-dangle */
    const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;
    /* eslint-enable */
    if (typeof devToolsExtension === 'function') {
        enhancers.push(devToolsExtension());
    }
}

const composedEnhancers = compose(
    applyMiddleware(...middleware),
    ...enhancers,
);

export default createStore(
    connectRouter(history)(rootReducer),
    initialState,
    composedEnhancers,
);
