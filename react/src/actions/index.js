import { createAction } from 'redux-actions';
import { message } from 'antd';
import { authLink, setListPageAndSize } from '../links';
import axios from 'axios';
export {
    getUsers,
    getUserById,
    updateUser
} from './userActions';

export const setActiveMenuStatistics = createAction('STATISTICS_MENU_SETTED');
export const setActiveMenuUsers = createAction('USERS_MENU_SETTED');
export const getListOfAnswersRequest = createAction('LIST_GET_REQUEST');
export const getListOfAnswerSuccess = createAction('LIST_GET_SUCCESS');
export const getListOfAnswerFailed = createAction('LIST_GET_FAILED');
export const loginRequest = createAction('LOGIN_REQUEST');
export const loginSuccess = createAction('LOGIN_SUCCESS');
export const loginFailed = createAction('LOGIN_FAILED');
export const logOutSuccess = createAction('LOGOUT_SUCCESS');
export const logOut = () => async (dispatch) => {
    localStorage.removeItem('userToken');
    dispatch(logOutSuccess());
};

export const login = ({ username, password }) => async (dispatch) => {
    await dispatch(loginRequest());
    try {
        const result = await axios.post(authLink, {
            username,
            password
        });

        localStorage.setItem('userToken', result.data.token);
        dispatch(loginSuccess());
    } catch (e) {
        dispatch(loginFailed());
        message.error('Некорректные учетные данные.');
    }
};

export const getListofAnswers = (current, pageSize) => async (dispatch) => {
    dispatch(getListOfAnswersRequest());
    try {
        const resultGetList = await axios.get(setListPageAndSize(current, pageSize), {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('userToken')}`
            }
        });
        dispatch(getListOfAnswerSuccess(resultGetList.data.results));
    } catch (e) {
        message.error('Не удалось загрузить данные с сервера');
        dispatch(getListOfAnswerFailed());
    }
};

export const changeCurrentPageAndSize = createAction('CURRENT_PAGE_CHANGE');

