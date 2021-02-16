import ActionType from '../ActionType';

const initialState = {
    loginError: '',
    loginSuccess: '',
    loginUser: {}
}

export default function loginReducer(state = initialState, action) {
    switch (action.type) {
        case ActionType.LOGIN_SUCCESS: {
            return { ...state, loginSuccess: action.payload};
        }

        case ActionType.LOGIN_ERROR: {
            return { ...state, loginError: action.payload};
        }

        case ActionType.LOGIN_USER: {
            return { ...state, loginUser: action.payload};
        }

        default: {
            return state;
        }
    }
}