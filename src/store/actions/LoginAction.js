import ActionType from '../ActionType';

export function login(...action) {

    return {
        type: ActionType.SET_LOGIN,
        payload: action
    }
}

export function logout(params) {

    return {
        type: ActionType.SET_LOGOUT,
        payload: params
    }
}