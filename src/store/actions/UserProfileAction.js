import ActionType from '../ActionType';

export function getConsultants(...action) {
    return {
        type: ActionType.GET_CONSULTANTS,
        payload: action
    }
}