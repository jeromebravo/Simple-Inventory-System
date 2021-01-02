import {combineReducers} from 'redux';
import alert from './alert';
import auth from './auth';
import dashboard from './dashboard';
import popup from './popup';
import product from './product';
import income from './income';
import expense from './expense';

const rootReducer = combineReducers({
    alert,
    auth,
    dashboard,
    popup,
    product,
    income,
    expense
});

export default rootReducer;