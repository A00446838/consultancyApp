import {put, call, takeLatest } from 'redux-saga/effects';
import ActionType from '../ActionType';
import {getLogin} from '../services/LoginService';
import * as jwt from 'jsonwebtoken';

export function* login(...action) {

    const params = action[0].payload[0];
    const onLoginSuccess = action[0].payload[1];
    const onLoginFailure = action[0].payload[2];

    try {
        const result = yield call(getLogin, params);
        yield put({type: ActionType.LOGIN_SUCCESS, payload: result.data});

        if (result.status === 200) {
          if (onLoginSuccess) {
              yield put({type: ActionType.LOGIN_USER, payload: jwt.decode(result.data.token)});
              onLoginSuccess(result.data);
          }
        } else {
            yield put({type: ActionType.LOGIN_USER, payload: {}});
            if (onLoginFailure) {
                onLoginFailure(result);
            }
        }
    } catch (error) {
        yield put({type: ActionType.LOGIN_ERROR, payload: 'Error in login'});
        onLoginFailure(error);
    }
}

export function* logout(params) {
    const onLogoutSuccess = params.payload;
    yield put({type: ActionType.LOGIN_SUCCESS, payload: {}});
    yield put({type: ActionType.LOGIN_USER, payload: {}});
    onLogoutSuccess();
}


export function* loginActionWatcher() {
    yield takeLatest(ActionType.SET_LOGIN, login);
    yield takeLatest(ActionType.SET_LOGOUT, logout);
}