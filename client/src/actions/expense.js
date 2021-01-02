import axios from 'axios';
import {LOAD_EXPENSE, LOADED_EXPENSE, GET_ALL_EXPENSE, NEW_EXPENSE, TOGGLE_NEW_POPUP, SELECT_DATE_EXPENSE, TOGGLE_DATE_POPUP, SEARCH_EXPENSE, TOGGLE_SEARCH_POPUP, VIEW_EXPENSE, EDIT_EXPENSE, DELETE_EXPENSE} from './types';
import {addAlert, removeAlert} from './alert';

// get all expense
export const getAllExpense = () => async dispatch => {
    try {
        dispatch({
            type: LOAD_EXPENSE
        });

        const res = await axios.get('/api/expense');

        dispatch({
            type: GET_ALL_EXPENSE,
            payload: res.data
        });

        dispatch(removeAlert());
    } catch(err) {
        dispatch({
            type: LOADED_EXPENSE
        });
        
        // remove alert
        dispatch(removeAlert());

        // add alert
        dispatch(addAlert(err.response.data.msg));

        console.error(err);
    }
}

// create new expense
export const newExpense = formData => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        dispatch({
            type: LOAD_EXPENSE
        });

        const res = await axios.post('/api/expense', formData, config);

        dispatch({
            type: NEW_EXPENSE,
            payload: res.data
        });

        dispatch({
            type: TOGGLE_NEW_POPUP
        });

        dispatch(removeAlert());
    } catch(err) {
        dispatch({
            type: LOADED_EXPENSE
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

// search expense by date
export const selectDateExpense = formData => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        dispatch({
            type: LOAD_EXPENSE
        });

        const res = await axios.post('/api/expense/date', formData, config);

        dispatch({
            type: SELECT_DATE_EXPENSE,
            payload: res.data
        });

        dispatch({
            type: TOGGLE_DATE_POPUP
        });

        dispatch(removeAlert());
    } catch(err) {
        dispatch({
            type: LOADED_EXPENSE
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

// search expense by description
export const searchExpense = formData => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        dispatch({
            type: LOAD_EXPENSE
        });

        const res = await axios.post('/api/expense/search', formData, config);

        dispatch({
            type: SEARCH_EXPENSE,
            payload: res.data
        });

        dispatch({
            type: TOGGLE_SEARCH_POPUP
        });

        dispatch(removeAlert());
    } catch(err) {
        dispatch({
            type: LOADED_EXPENSE
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

// view expense
export const viewExpense = id => async dispatch => {
    try {
        dispatch({
            type: LOAD_EXPENSE
        });

        const res = await axios.get(`/api/expense/${id}`);

        dispatch({
            type: VIEW_EXPENSE,
            payload: res.data
        });

        dispatch(removeAlert());
    } catch(err) {
        dispatch({
            type: LOADED_EXPENSE
        });

        // remove alert
        dispatch(removeAlert());

        // add alert
        dispatch(addAlert(err.response.data.msg));

        console.error(err);
    }
}

// edit expense
export const editExpense = (id, formData) => async dispatch => {
    const config = {
        header: {
            'Content-Type': 'application/json'
        }
    };

    try {
        dispatch({
            type: LOAD_EXPENSE
        });

        const res = await axios.put(`/api/expense/${id}/edit`, formData, config);

        dispatch({
            type: EDIT_EXPENSE,
            payload: res.data
        });

        dispatch(removeAlert());
    } catch(err) {
        dispatch({
            type: LOADED_EXPENSE
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

// delete expense
export const deleteExpense = id => async dispatch => {
    try {
        dispatch({
            type: LOAD_EXPENSE
        });

        await axios.delete(`/api/expense/${id}/delete`);

        dispatch({
            type: DELETE_EXPENSE,
            payload: id
        });

        dispatch(removeAlert());
    } catch(err) {
        dispatch({
            type: LOADED_EXPENSE
        });

        // remove alert
        dispatch(removeAlert());

        // add alert
        dispatch(addAlert(err.response.data.msg));

        console.error(err);
    }
}