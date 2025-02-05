import ActionType from '../ActionType';

const initialState = {
    consultants: []
}

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case ActionType.SET_CONSULTANTS: {
            return { ...state, consultants: action.payload};
        }

        default: {
            return state;
        }
    }
}