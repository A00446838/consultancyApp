import axios from "axios";
import {USER} from "../../config/ApiConfigs";

export const updatePersonalInfoAPI = (params) => axios.put(USER + '/' + params._id, params)
    .then(response => {
        return response;
    })
    .catch(error => {
        return error;
    });

