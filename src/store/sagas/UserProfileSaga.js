import { put, call, takeLatest, get } from 'redux-saga/effects';
import ActionType from '../ActionType';
import { getConsultantsAPI } from '../services/UserProfileService';
import * as jwt from "jsonwebtoken";

export function* getConsultants(...action) {
    try {
        const result = yield call(getConsultantsAPI);

        // console.log(result)

        if (result.status === 200) {
                yield put({ type: ActionType.SET_CONSULTANTS, payload: result.data.response });
        }
    } catch (err) {
        console.log("Saga -> " + err);
    }
}


export function* userProfileActionWatcher() {
    yield takeLatest(ActionType.GET_CONSULTANTS, getConsultants);
}