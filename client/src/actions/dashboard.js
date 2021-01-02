import axios from 'axios';
import {GET_DASHBOARD, LOAD_DASHBOARD, SELECT_DATE_DASHBOARD, TOGGLE_DATE_POPUP, LOADED_DASHBOARD} from './types';
import {addAlert, removeAlert} from './alert';

// get capital, expense, gross income, and net income
export const getDashboard = () => async dispatch => {
    try {
        dispatch({
            type: LOAD_DASHBOARD
        });

        const res = await axios.get('/api/dashboard');

        dispatch({
            type: GET_DASHBOARD,
            payload: res.data
        });
    } catch(err) {
        dispatch({
            type: LOADED_DASHBOARD
        });

        // remove alert
        dispatch(removeAlert());

        // add alert
        dispatch(addAlert(err.response.data.msg));

        console.error(err);
    }
}

// search date to get the capital, expense, gross income, and net income
export const selectDate = formData => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        dispatch({
            type: LOAD_DASHBOARD
        });

        const res = await axios.post('/api/dashboard/date', formData, config);

        dispatch({
            type: SELECT_DATE_DASHBOARD,
            payload: res.data
        });

        dispatch({
            type: TOGGLE_DATE_POPUP
        });

        // remove alert
        dispatch(removeAlert());
    } catch(err) {
        dispatch({
            type: LOADED_DASHBOARD
        });

        const errors = err.response.data.errors;

        if(errors) {
            // remove alert
            dispatch(removeAlert());

            // add alert
            errors.forEach(error => dispatch(addAlert(error.msg)));
        }

        console.error(err);
    }
}