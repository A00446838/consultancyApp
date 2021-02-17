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

/* export const getLogin = (params) =>  {
return {
    status: 200,
    data : {
        token: 'AMZ'
    }
}
}; */


export const signUpApi = (params) => axios.post(SIGN_UP, params)
    .then(response => {
        return response;
    })
    .catch(error => {
        return error;
    });



//error handler example
/*
export const testAPI = (params) => axios.put('test' + params.test, params.payload)
    .then(response => {
        return response;
    })
    .catch(handleError);*/
