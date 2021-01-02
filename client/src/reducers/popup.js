import {TOGGLE_DATE_POPUP, TOGGLE_NEW_POPUP, TOGGLE_SEARCH_POPUP, TOGGLE_STATUS_POPUP, TOGGLE_VIEW_PRODUCT, TOGGLE_VIEW_EXPENSE} from '../actions/types';

const initialState = {
    dateActive: false,
    newActive: false,
    searchActive: false,
    statusActive: false,
    productActive: false,
    expenseActive: false
}

const popup = (state = initialState, action) => {
    switch(action.type) {
        case  TOGGLE_DATE_POPUP:
            return {...state, dateActive: !state.dateActive};

        case TOGGLE_NEW_POPUP:
            return {...state, newActive: !state.newActive};

        case TOGGLE_SEARCH_POPUP:
            return {...state, searchActive: !state.searchActive};

        case TOGGLE_STATUS_POPUP:
            return {...state, statusActive: !state.statusActive};

        case TOGGLE_VIEW_PRODUCT:
            return {...state, productActive: !state.productActive};

        case TOGGLE_VIEW_EXPENSE:
            return {...state, expenseActive: !state.expenseActive};

        default:
            return state;
    }
}

export default popup;