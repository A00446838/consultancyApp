import axios from "axios";
import { USER, GET_CONSULTANTS } from "../../config/ApiConfigs";

export const getConsultantsAPI = () =>
    axios.get(GET_CONSULTANTS).then(response => {
        return response
    })
        .catch(err => {
            return err
        })


