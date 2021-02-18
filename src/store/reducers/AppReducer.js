import { combineReducers } from 'redux';
import loginReducer from './LoginReducer'
import signUpReducer from './SignUpReducer'
import userReducer from './UserReducer'

export default combineReducers({
    loginReducer,
    signUpReducer,
    userReducer
});