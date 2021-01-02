import React, {useEffect} from 'react';
import './App.css';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import store from './store';
import Routes from './components/Routes/Routes';
import setTokenHeader from './utils/setTokenHeader';
import {loadUser, logout} from './actions/auth';

const App = () => {
    useEffect(() => {
        if(localStorage.token) {
            setTokenHeader(localStorage.token);
            store.dispatch(loadUser());
        } else {
            store.dispatch(logout)
        }
    }, []);

    return (
        <Provider store={store}>
            <Router>
                <Routes />
            </Router>
        </Provider>
    )
}

export default App;