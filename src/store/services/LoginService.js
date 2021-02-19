import axios from "axios";
import { LOGIN, SIGN_UP, LOGOUT } from "../../config/ApiConfigs";

export const getLogin = (params) => axios.post(LOGIN, params)
    .then(response => {
        return response;
    })
    .catch(error => {
        return error;
    });


export const signUpApi = (params) => axios.post(SIGN_UP, params)
    .then(response => {
        return response;
    })
    .catch(error => {
        return error;
    });

export const logOut = (params) => axios.post(LOGOUT, params)
    .then(response => {
        return response;
    })
    .catch(error => {
        return error;
    });
