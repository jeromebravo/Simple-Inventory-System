import axios from 'axios';
import {LOAD_PRODUCTS, LOADED_PRODUCTS, NEW_PRODUCT, TOGGLE_NEW_POPUP, SEARCH_PRODUCT, TOGGLE_SEARCH_POPUP, SELECT_STATUS, VIEW_PRODUCT, EDIT_PRODUCT, BUY_PRODUCT, DELETE_PRODUCT} from './types';
import {addAlert, removeAlert} from './alert';

// create new product
export const newProduct = formData => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        dispatch({
            type: LOAD_PRODUCTS
        });

        const res = await axios.post('/api/product', formData, config);

        dispatch({
            type: NEW_PRODUCT,
            payload: res.data
        });

        dispatch({
            type: TOGGLE_NEW_POPUP
        });

        // remove alert
        dispatch(removeAlert());
    } catch(err) {
        dispatch({
            type: LOADED_PRODUCTS
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

// search product by name
export const searchProduct = formData => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        dispatch({
            type: LOAD_PRODUCTS
        });

        const res = await axios.post('/api/product/search', formData, config);

        dispatch({
            type: SEARCH_PRODUCT,
            payload: res.data
        });

        dispatch({
            type: TOGGLE_SEARCH_POPUP
        });

        dispatch(removeAlert());
    } catch(err) {
        dispatch({
            type: LOADED_PRODUCTS
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

// select product by status
export const selectStatus = formData => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        dispatch({
            type: LOAD_PRODUCTS
        });

        const res = await axios.post('/api/product/status', formData, config);

        dispatch({
            type: SELECT_STATUS,
            payload: res.data
        });

        dispatch(removeAlert());
    } catch(err) {
        dispatch({
            type: LOADED_PRODUCTS
        });

        const errors = err.response.data.errors;

        if(errors) {
            // remove alert
            dispatch(removeAlert());

            // add  alert
            errors.forEach(error => dispatch(addAlert(error.msg)));
        }

        console.error(err);
    }
}

// view product
export const viewProduct = id => async dispatch => {
    try {
        dispatch({
            type: LOAD_PRODUCTS
        });

        const res = await axios.get(`/api/product/${id}`);

        dispatch({
            type: VIEW_PRODUCT,
            payload: res.data
        });

        dispatch(removeAlert());
    } catch(err) {
        dispatch({
            type: LOADED_PRODUCTS
        });

        // remove alert
        dispatch(removeAlert());

        // add alert
        dispatch(addAlert(err.response.data.msg));
    }
}

// edit product
export const editProduct = (id, formData) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    
    try {
        dispatch({
            type: LOAD_PRODUCTS
        });

        const res = await axios.put(`/api/product/${id}/edit`, formData, config);

        dispatch({
            type: EDIT_PRODUCT,
            payload: res.data
        });

        dispatch(removeAlert());
    } catch(err) {
        dispatch({
            type: LOADED_PRODUCTS
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

// buy product
export const buyProduct = (id, formData) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    
    try {
        dispatch({
            type: LOAD_PRODUCTS
        });

        const res = await axios.put(`/api/product/${id}/buy`, formData, config);

        dispatch({
            type: BUY_PRODUCT,
            payload: res.data
        });

        dispatch(removeAlert());
    } catch(err) {
        dispatch({
            type: LOADED_PRODUCTS
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

// delete product
export const deleteProduct = id => async dispatch => {
    try {
        dispatch({
            type: LOAD_PRODUCTS
        });

        await axios.delete(`/api/product/${id}`);

        dispatch({
            type: DELETE_PRODUCT,
            payload: id
        });
    } catch(err) {
        dispatch({
            type: LOADED_PRODUCTS
        });

        // remove alert
        dispatch(removeAlert());

        // add alert
        dispatch(addAlert(err.response.data.msg));
    }
}