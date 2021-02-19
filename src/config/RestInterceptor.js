import axios from 'axios';
import { BACKEND_URL } from '../config/ApiConfigs';
import { store } from "../store/index";

axios.defaults.baseURL = BACKEND_URL;

const setupInterceptors = () => {
    const onRequestSuccess = config => {
        let userData = store.getState() && store.getState().loginReducer;
        let authToken = (userData && userData.loginSuccess && userData.loginSuccess.token) ? userData.loginSuccess.token : '';
        if (authToken) {
            config.headers['authorization'] = 'Bearer ' + authToken;
        }

        return config;
    };
    const onResponseSuccess = response => response;
    const onResponseError = err => {
        console.log(err)
        return err && err.response ? err.response : err;
    };
    axios.interceptors.request.use(onRequestSuccess);
    axios.interceptors.response.use(onResponseSuccess, onResponseError);
};

export default setupInterceptors;