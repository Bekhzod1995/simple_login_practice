import { handleActions } from 'redux-actions';
import * as actions from '../actions/userActions';

const userHandler = handleActions({
    [actions.getUsersRequest] (state) {
        return {
            ...state,
            is_usersTableLoaded: false,
            activeData: 'UsersList'
        };
    },
    [actions.getUsersSuccess] (state, { payload }) {
        const { data } = payload;
        return {
            ...state,
            is_usersTableLoaded: true,
            usersTableData: [...data.results],
            activeData: 'UsersList'
        };
    },
    [actions.getUsersFailed] (state) {
        return {
            ...state,
            is_usersTableLoaded: false,
            activeData: 'UsersList'
        };
    },
    [actions.getUserByIdRequest] (state) {
        return {
            ...state,
            is_userFound: false,
            activeData: 'User'
        };
    },
    [actions.getUserByIdSuccess] (state, { payload }) {
        const { data } = payload;
        return {
            ...state,
            is_userFound: true,
            userData: data,
            activeData: 'User'
        };
    },
    [actions.getUserByIdFailed] (state) {
        return {
            ...state,
            is_userFound: false,
            activeData: 'User'
        };
    }
}, {
});

export default userHandler;
