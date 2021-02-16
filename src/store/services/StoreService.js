import axios from "axios";
import {STORE} from "../../config/ApiConfigs";
//import handleError from "../../config/RestErrorhandler";

export const registerStore = (params) => axios.post(STORE, params)
    .then(response => {
        return response;
    })
    .catch(error => {
        return error;
    });