import axios from "axios";
import {USER, GET_CONSULTANTS} from "../../config/ApiConfigs";

export const updatePersonalInfoAPI = (params) => axios.put(USER + '/' + params._id, params)
    .then(response => {
        return response;
    })
    .catch(error => {
        return error;
    });

export const getConsultantsAPI = () => {
    axios.get(GET_CONSULTANTS).then(response => {
        return response
    })
    .catch(err => {
        return err
    })
}

