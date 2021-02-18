import ActionType from '../ActionType';

export function updatePersonalInfo(...action) {

    return {
        type: ActionType.SET_UPDATE_PERSONAL_INFO,
        payload: action
    }
}

export function getConsultants(...action) {
    return {
        type: ActionType.GET_CONSULTANTS,
        payload: action
    }
}