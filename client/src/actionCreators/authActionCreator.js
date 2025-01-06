import api from '../utils/api';
import * as auth from '../actions/auth';

export const login = (username, password) => {
    return (dispatch) => {
        dispatch(auth.login(username, password));
        api.login(username, password)
            .then((response) => {
                if (response.error) {
                    dispatch(auth.loginFailed(response.error));
                } else {
                    dispatch(auth.loginSuccess(response.message));
                }
            });
    };
};

export const logout = () => {
    return (dispatch) => {
        dispatch(auth.logout());
        api.logout()
            .then((response) => {
                if (response.error) {
                    dispatch(auth.logoutFailed(response.error));
                } else {
                    dispatch(auth.logoutSuccess(response.message));
                }
            });
    };
};
