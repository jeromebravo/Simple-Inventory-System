import {GET_DASHBOARD, LOAD_DASHBOARD, SELECT_DATE_DASHBOARD, LOADED_DASHBOARD} from '../actions/types';

const initialState = {
    dashboard: {},
    loading: true
};

const dashboard = (state = initialState, action) => {
    const {type, payload} = action;

    switch(type) {
        case GET_DASHBOARD:
        case SELECT_DATE_DASHBOARD:
            return {...state, dashboard: payload, loading: false};

        case LOAD_DASHBOARD:
            return {...state, loading: true};

        case LOADED_DASHBOARD:
            return {...state, loading: false};

        default:
            return state;
    }
}

export default dashboard;