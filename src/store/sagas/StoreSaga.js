import {put, call, takeLatest } from 'redux-saga/effects';
import ActionType from '../ActionType';
import {registerStore} from '../services/StoreService';

export function* storeRegister(...action) {

    const params = action[0].payload[0];
    const onRegisterSuccess = action[0].payload[1];
    const onRegisterFailure = action[0].payload[2];

    try {
        const result = yield call(registerStore, params);

        if (result.status === 200) {
            if (onRegisterSuccess) {
                onRegisterSuccess(result);
            }
        } else {
            if (onRegisterFailure) {
                onRegisterFailure(result);
            }
        }
    } catch (error) {
        onRegisterFailure(error);
    }
}


export function* storeActionWatcher() {
    yield takeLatest(ActionType.SET_STORE_REGISTRATION, storeRegister);
}