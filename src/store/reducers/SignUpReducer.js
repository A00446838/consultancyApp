import ActionType from '../ActionType';

const initialState = {
    signUpnError: '',
    signUpSuccess: ''
}

export default function signUpReducer(state = initialState, action) {
    switch (action.type) {
        case ActionType.SIGNUP_SUCCESS: {
            return { ...state, loginSuccess: action.payload};
        }

        case ActionType.SIGNUP_ERROR: {
            return { ...state, loginError: action.payload};
        }

        default: {
            return state;
        }
    }
}