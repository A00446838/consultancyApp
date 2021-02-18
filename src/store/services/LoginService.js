import axios from "axios";
import { LOGIN, SIGN_UP } from "../../config/ApiConfigs";
//import handleError from "../../config/RestErrorhandler";

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
