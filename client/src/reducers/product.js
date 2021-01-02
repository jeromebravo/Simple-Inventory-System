import {LOAD_PRODUCTS, LOADED_PRODUCTS, NEW_PRODUCT, SEARCH_PRODUCT, SELECT_STATUS, VIEW_PRODUCT, EDIT_PRODUCT, BUY_PRODUCT, DELETE_PRODUCT, CANCEL_PRODUCT} from '../actions/types';

const initialState = {
    products: [],
    product: {},
    loading: true
};

const product = (state = initialState, action) => {
    const {type, payload} = action;

    switch(type) {
        case LOAD_PRODUCTS:
            return {...state, loading: true};

        case LOADED_PRODUCTS:
            return {...state, loading: false};

        case SEARCH_PRODUCT:
        case SELECT_STATUS:
            return {...state, products: payload, loading: false};

        case NEW_PRODUCT:
            return {...state, products: [payload, ...state.products], loading: false};

        case VIEW_PRODUCT:
            return {...state, product: payload, loading: false};

        case EDIT_PRODUCT:
        case BUY_PRODUCT:
            return {
                ...state,
                products: state.products.map(product => product._id === payload._id ? payload : product),
                product: payload,
                loading: false
            };

        case CANCEL_PRODUCT:
            return {
                ...state,
                products: state.products.map(product => product._id === payload._id ? payload : product),
                loading: false
            };

        case DELETE_PRODUCT:
            return {
                ...state,
                products: state.products.filter(product => product._id !== payload),
                product: {},
                loading: false
            }

        default:
            return state;
    }
}

export default product;