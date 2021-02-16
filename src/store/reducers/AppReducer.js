import { combineReducers } from 'redux';
import loginReducer from './LoginReducer'
import signUpReducer from './SignUpReducer'

export default combineReducers({
    loginReducer,
    signUpReducer
});