import React from 'react';
import ReactDOM from 'react-dom';
import App from './src/App';
import 'antd/dist/antd.css';
import {
    createStore,
    applyMiddleware,
    compose
} from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import rootReducer from './src/reducers';


const initialValue = {
    logInHandler: {
        currentPage: 1,
        pageSize: 10
    }
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, initialValue, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);
