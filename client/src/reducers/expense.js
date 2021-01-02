import {LOAD_EXPENSE, LOADED_EXPENSE, GET_ALL_EXPENSE, NEW_EXPENSE, SELECT_DATE_EXPENSE, SEARCH_EXPENSE, VIEW_EXPENSE, EDIT_EXPENSE, DELETE_EXPENSE} from '../actions/types';

const initialState = {
    expenses: [],
    expense: {},
    loading: true
};

const expense = (state = initialState, action) => {
    const {type, payload} = action;

    switch(type) {
        case LOAD_EXPENSE:
            return {...state, loading: true};

        case LOADED_EXPENSE:
            return {...state, loading: false};

        case GET_ALL_EXPENSE:
        case SELECT_DATE_EXPENSE:
        case SEARCH_EXPENSE:
            return {...state, expenses: payload, loading: false};

        case NEW_EXPENSE:
            return {...state, expenses: [payload, ...state.expenses], loading: false};

        case VIEW_EXPENSE:
            return {...state, expense: payload, loading: false};

        case EDIT_EXPENSE:
            return {
                ...state,
                expense: payload,
                loading: false,
                expenses: state.expenses.map(expense => expense._id === payload._id ? payload : expense)
            };

        case DELETE_EXPENSE:
            return {
                ...state,
                expense: {},
                loading: false,
                expenses: state.expenses.filter(expense => expense._id !== payload)
            }

        default:
            return state;
    }
}

export default expense;