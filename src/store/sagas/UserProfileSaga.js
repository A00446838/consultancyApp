import { put, call, takeLatest, get } from 'redux-saga/effects';
import ActionType from '../ActionType';
import { updatePersonalInfoAPI, getConsultantsAPI } from '../services/UserProfileService';
import * as jwt from "jsonwebtoken";

export function* updatePersonalInfo(...action) {

    const params = action[0].payload[0];
    const onSuccess = action[0].payload[1];
    const onFailure = action[0].payload[2];

    try {
        const result = yield call(updatePersonalInfoAPI, params);

        if (result.status === 200) {
            if (onSuccess) {
                let updatedUser = {
                    "user": params
                }
                yield put({ type: ActionType.LOGIN_USER, payload: updatedUser });
                onSuccess(result);
            }
        } else {
            if (onFailure) {
                onFailure(result);
            }
        }
    } catch (error) {
        onFailure(error);
    }
}

export function* getConsultants(...action) {
    try {
        const result = yield call(getConsultantsAPI);

        console.log(result)

        if (result.status === 200) {
                yield put({ type: ActionType.LOGIN_USER, payload: result.data.response });
        }
    } catch (err) {
        console.log("Saga -> " + err);
    }
}


export function* userProfileActionWatcher() {
    yield takeLatest(ActionType.SET_UPDATE_PERSONAL_INFO, updatePersonalInfo);
    yield takeLatest(ActionType.GET_CONSULTANTS, getConsultants);
}