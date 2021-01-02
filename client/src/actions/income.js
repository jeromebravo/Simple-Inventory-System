import axios from 'axios';
import {LOAD_INCOME, GET_ALL_INCOME, SELECT_DATE_INCOME, LOADED_INCOME, TOGGLE_DATE_POPUP, SEARCH_INCOME, TOGGLE_SEARCH_POPUP, LOAD_PRODUCTS, LOADED_PRODUCTS, CANCEL_PRODUCT} from './types';
import {addAlert, removeAlert} from './alert';

// get all income
export const getAllIncome = () => async dispatch => {
    try {
        dispatch({
            type: LOAD_INCOME
        });

        const res = await axios.get('/api/income');

        dispatch({
            type: GET_ALL_INCOME,
            payload: res.data
        });

        dispatch(removeAlert());
    } catch(err) {
        dispatch({
            type: LOADED_INCOME
        });

        // remove alert
        dispatch(removeAlert());

        // add alert
        dispatch(addAlert(err.response.data.msg));

        console.error(err);
    }
}

// search income by date
export const selectIncomeDate = formData => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        } 
    };

    try {
        dispatch({
            type: LOAD_INCOME
        });

        const res = await axios.post('/api/income/date', formData, config);

        dispatch({
            type: SELECT_DATE_INCOME,
            payload: res.data
        });

        dispatch({
            type: TOGGLE_DATE_POPUP
        });

        dispatch(removeAlert());
    } catch(err) {
        dispatch({
            type: LOADED_INCOME
        });

        const errors = err.response.data.errors;

        if(errors) {
            // remove alert
            dispatch(removeAlert());

            // add alert
            errors.map(error => dispatch(addAlert(error.msg)));
        }

        console.error(err);
    }
}

// search income by name
export const searchIncome = formData => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        dispatch({
            type: LOAD_INCOME
        });

        const res = await axios.post('/api/income/search', formData, config);

        dispatch({
            type: SEARCH_INCOME,
            payload: res.data
        });

        dispatch({
            type: TOGGLE_SEARCH_POPUP
        });

        dispatch(removeAlert());
    } catch(err) {
        dispatch({
            type: LOADED_INCOME
        });

        const errors = err.response.data.errors;

        if(errors) {
            // remove alert
            dispatch(removeAlert());

            // add alert
            errors.map(error => dispatch(addAlert(error.msg)));
        }

        console.error(err);
    }
}

// cancel order
export const cancelOrder = id => async dispatch => {
    try {
        dispatch({
            type: LOAD_INCOME
        });

        dispatch({
            type: LOAD_PRODUCTS
        });

        const res = await axios.put(`/api/income/${id}/cancel`);

        dispatch({
            type: CANCEL_PRODUCT,
            payload: res.data
        });

        dispatch(removeAlert());
    } catch(err) {
        dispatch({
            type: LOADED_INCOME
        });

        dispatch({
            type: LOADED_PRODUCTS
        });

        // remove alert
        dispatch(removeAlert());

        // add alert
        dispatch(addAlert(err.response.data.msg));

        console.error(err);
    }
}