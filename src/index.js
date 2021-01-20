import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/rootReducer';
import App from './App';
import LoadingBar from 'react-redux-loading-bar'
import { loadingBarMiddleware } from 'react-redux-loading-bar'
import ErrorModal from './components/ErrorModal';

const store = createStore(rootReducer, applyMiddleware(thunk, loadingBarMiddleware()))

ReactDOM.render(
    <Provider store={store}>
        <LoadingBar className="loader"/>
        <ErrorModal/>
        <App />
    </Provider>,
document.getElementById('root'));