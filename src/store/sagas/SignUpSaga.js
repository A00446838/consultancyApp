import {put, call, takeLatest } from 'redux-saga/effects';
import ActionType from '../ActionType';
import {signUpApi} from '../services/LoginService';

export function* signUp(...action) {

    const params = action[0].payload[0];
    const onSignUpSuccess = action[0].payload[1];
    const onSignUpFailure = action[0].payload[2];

    try {
        const result = yield call(signUpApi, params);
        yield put({type: ActionType.SIGNUP_SUCCESS, payload: result});

        if (result.status === 200) {
            if (onSignUpSuccess) {
                onSignUpSuccess(result);
            }
        } else {
            if (onSignUpFailure) {
                onSignUpFailure(result);
            }
        }
    } catch (error) {
        yield put({type: ActionType.SIGNUP_ERROR, payload: 'Error in sign up'});
        onSignUpFailure(error);
    }
}


export function* singUpActionWatcher() {
    yield takeLatest(ActionType.SET_SIGNUP, signUp);
}