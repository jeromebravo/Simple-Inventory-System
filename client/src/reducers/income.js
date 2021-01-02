import {GET_ALL_INCOME, LOAD_INCOME, SELECT_DATE_INCOME, LOADED_INCOME, SEARCH_INCOME, CANCEL_PRODUCT} from '../actions/types';

const initialState = {
    products: [],
    loading: true
};

const income = (state = initialState, action) => {
    const {type, payload} = action;

    switch(type) {
        case LOAD_INCOME:
            return {...state, loading: true};

        case LOADED_INCOME:
            return {...state, loading: false};

        case GET_ALL_INCOME:
        case SELECT_DATE_INCOME:
        case SEARCH_INCOME:
            return {...state, products: payload, loading: false};

        case CANCEL_PRODUCT:
            return {
                ...state,
                loading: false,
                products: state.products.filter(product => product._id !== payload._id)
            };

        default:
            return state;
    }
}

export default income;