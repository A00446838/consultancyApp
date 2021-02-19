import { all, fork } from "redux-saga/effects";
import {loginActionWatcher} from './LoginSaga';
import {singUpActionWatcher} from './SignUpSaga';
import {userProfileActionWatcher} from './UserProfileSaga';

export default function* rootSaga() {
    yield all([
        fork(loginActionWatcher),
        fork(singUpActionWatcher),
        fork(userProfileActionWatcher),
    ]);
}