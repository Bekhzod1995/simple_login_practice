import { createAction } from 'redux-actions';
import { message } from 'antd';
import { getUsersListLink, getAndpatchUser } from '../links';
import axios from 'axios';

export const getUsersRequest = createAction('USERS_GET_REQUEST');
export const getUsersFailed = createAction('USERS_GET_FAILED');
export const getUsersSuccess = createAction('USERS_GET_SUCCESS');
export const getUserByIdRequest = createAction('USER_BY_ID_GET_REQUEST');
export const getUserByIdSuccess = createAction('USER_BY_ID_GET_SUCCESS');
export const getUserByIdFailed = createAction('USER_BY_ID_GET_FAILED');
export const updateUserRequest = createAction('USER_UPDATE_REQUEST');
export const updateUserSuccess = createAction('USER_UPDATE_SUCCESS');
export const updateUserFailed = createAction('USER_UPDATE_FAILED');

export const updateUser = (editedRow, id) => async (dispatch) => {
    dispatch(updateUserRequest);
    try {
        console.log(`Bearer ${localStorage.getItem('userToken')}`);
        const updatedUser = await axios.patch(getAndpatchUser(id), {
            retail_point_name: editedRow.retailpointname,
            phone: editedRow.user,
            lang: editedRow.lang,
            balance: editedRow.balance,
            is_active: editedRow.is_active
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('userToken')}`
            }
        });
        message.success('Успешно изменен');
        console.log('Success: ', updatedUser);
    } catch (e) {
        message.error('Не удалось изменить данные');
    }
};


export const getUserById = ({ search }) => async (dispatch) => {
    dispatch(getUserByIdRequest);
    try {
        const gettingUserById = await axios.get(getAndpatchUser(search), {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('userToken')}`
            }
        });
        dispatch(getUserByIdSuccess(gettingUserById));
    } catch (e) {
        message.error('Не удалось загрузить данные с сервера');
        dispatch(getUserByIdFailed());
    }
};

export const getUsers = () => async (dispatch) => {
    dispatch(getUsersRequest());
    try {
        const gettingUserResult = await axios.get(getUsersListLink, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('userToken')}`
            }
        });
        console.log(gettingUserResult);
        dispatch(getUsersSuccess(gettingUserResult));
    } catch (e) {
        message.error('Не удалось загрузить данные с сервера');
        dispatch(getUsersFailed());
    }
};
