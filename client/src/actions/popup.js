import {TOGGLE_DATE_POPUP, TOGGLE_NEW_POPUP, TOGGLE_SEARCH_POPUP, TOGGLE_STATUS_POPUP, TOGGLE_VIEW_PRODUCT, TOGGLE_VIEW_EXPENSE} from './types';

// toggle date popup
export const toggleDatePopup = () => dispatch => dispatch({type: TOGGLE_DATE_POPUP});

// toggle new product popup or new expense popup
export const toggleNewPopup = () => dispatch => dispatch({type: TOGGLE_NEW_POPUP});

// toggle search product or search expense popup
export const toggleSearchPopup = () => dispatch => dispatch({type: TOGGLE_SEARCH_POPUP});

// toggle status popup
export const toggleStatusPopup = () => dispatch => dispatch({type: TOGGLE_STATUS_POPUP});

// toggle view product
export const toggleViewProduct = () => dispatch => dispatch({type: TOGGLE_VIEW_PRODUCT});

// toggle view expense
export const toggleViewExpense = () => dispatch => dispatch({type: TOGGLE_VIEW_EXPENSE});