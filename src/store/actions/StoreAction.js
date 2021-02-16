import ActionType from '../ActionType';

export function registerStore(...action) {

    return {
        type: ActionType.SET_STORE_REGISTRATION,
        payload: action
    }
}