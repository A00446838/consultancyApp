import ActionType from "../ActionType";

export function signUp(...action) {

    return {
        type: ActionType.SET_SIGNUP,
        payload: action
    }
}