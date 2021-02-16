import { all, fork } from "redux-saga/effects";
import {loginActionWatcher} from './LoginSaga';
import {singUpActionWatcher} from './SignUpSaga';
import {userProfileActionWatcher} from './UserProfileSaga';
import {storeActionWatcher} from './StoreSaga';

export default function* rootSaga() {
    yield all([
        fork(loginActionWatcher),
        fork(singUpActionWatcher),
        fork(storeActionWatcher),
        fork(userProfileActionWatcher),
    ]);
}