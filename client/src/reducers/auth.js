import {SET_CURRENT_USER, LOAD_CURRENT_USER} from '../actions/types';

const initialState = {
    currentUser: {},
    isAuthenticated: false,
    loading: true
}

const auth = (state = initialState, action) => {
    const {type, payload} = action;

    switch(type) {
        case SET_CURRENT_USER:
            return {...state, currentUser: payload, loading: false, isAuthenticated: !!Object.keys(payload).length};

        case LOAD_CURRENT_USER:
            return {...state, loading: true};

        default:
            return state;
    }
}

export default auth;