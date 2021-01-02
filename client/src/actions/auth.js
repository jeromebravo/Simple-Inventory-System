import axios from 'axios';
import {SET_CURRENT_USER, LOAD_CURRENT_USER} from './types';
import setTokenHeader from '../utils/setTokenHeader';
import {addAlert, removeAlert} from './alert';

// get current user
export const loadUser = () => async dispatch => {
    try {
        dispatch({
            type: LOAD_CURRENT_USER
        });

        const res = await axios.get('/api/user');

        dispatch({
            type: SET_CURRENT_USER,
            payload: res.data
        });
    } catch(err) {
        console.error(err);

        dispatch(addAlert(err.response.data.msg));
    }
}

// sign up user
export const signup = formData => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        dispatch({
            type: LOAD_CURRENT_USER
        });

        // remove alert
        dispatch(removeAlert());

        const res = await axios.post('/api/auth/signup', formData, config);

        const {user, token} = res.data;

        // set token in local storage
        localStorage.setItem('token', token);

        // set token in header
        setTokenHeader(token);

        // set current user in redux
        dispatch({
            type: SET_CURRENT_USER,
            payload: user
        });
    } catch(err) {
        const errors =  err.response.data.errors;

        if(errors) {
            // remove alert
            dispatch(removeAlert());

            // add each alert
            errors.forEach(error => dispatch(addAlert(error.msg)));
        }

        console.error(err);
    }
}

// login user
export const login = formData => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        dispatch({
            type: LOAD_CURRENT_USER
        });

        // remove alert
        dispatch(removeAlert());

        const res = await axios.post('/api/auth/login', formData, config);

        const {user, token} = res.data;

        // set token in local storage
        localStorage.setItem('token', token);

        // set token in header
        setTokenHeader(token);

        // set current user in redux
        dispatch({
            type: SET_CURRENT_USER,
            payload: user
        });
    } catch(err) {
        const errors = err.response.data.errors;

        if(errors) {
            // remove alert
            dispatch(removeAlert());

            // add each alert
            errors.forEach(error => dispatch(addAlert(error.msg)));
        }

        console.error(err);
    }
}

// logout user
export const logout = () => dispatch => {
    // remove token in local storage
    localStorage.removeItem('token');

    // remove token in header
    setTokenHeader(false);

    // set current user into empty object
    dispatch({
        type: SET_CURRENT_USER,
        payload: {}
    });
}