import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import sessionReducer from './session';
import workspacesReducer from './workspaces';
import channelsReducer from './channels';
import messagesReducer from './messages';
import dmsReducer from './dms';

export const rootReducer = combineReducers({
    session: sessionReducer,
    workspaces: workspacesReducer,
    channels: channelsReducer,
    messages: messagesReducer,
    dms: dmsReducer
})

let enhancer;

if (process.env.NODE_ENV === 'production') {
    enhancer = applyMiddleware(thunk);
} else {
    const logger = require('redux-logger').default;
    const composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;