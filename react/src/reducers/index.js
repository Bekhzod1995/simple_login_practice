import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import * as actions from '../actions';
import userHandler from './userHandler';

const logInHandler = handleActions({
    [actions.loginSuccess] (state) {
        return {
            ...state,
            isLogged: true,
            requestIsPending: false
        };
    },
    [actions.loginRequest] (state) {
        return {
            ...state,
            requestIsPending: true
        };
    },
    [actions.loginFailed] (state) {
        return {
            ...state,
            requestIsPending: false
        };
    },
    [actions.logOutSuccess] (state) {
        return {
            ...state,
            isLogged: false
        };
    },
    [actions.getListOfAnswerSuccess] (state, { payload }) {
        return {
            ...state,
            getListResult: payload,
            is_tableLoaded: true
        };
    },
    [actions.getListOfAnswersRequest] (state) {
        return {
            ...state,
            is_tableLoaded: false
        };
    },
    [actions.getListOfAnswerFailed] (state) {
        return {
            ...state,
            is_tableLoaded: false
        };
    },
    [actions.changeCurrentPageAndSize] (state, { payload }) {
        const { currentPageTypeOfNumber, pageSizeTypeOfNumber } = payload;
        return {
            ...state,
            currentPage: currentPageTypeOfNumber,
            pageSize: pageSizeTypeOfNumber
        };
    },
    [actions.setActiveMenuStatistics] (state) {
        return {
            ...state,
            activeMenu: 1
        };
    },
    [actions.setActiveMenuUsers] (state) {
        return {
            ...state,
            activeMenu: 2
        };
    }
}, {
    logInHandler: {

    }
});

export default combineReducers({
    logInHandler,
    userHandler
});
