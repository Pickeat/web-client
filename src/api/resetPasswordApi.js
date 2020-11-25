import setAxiosConfig from "../helpers/setAxiosConfig";
import axios from "axios";
import {toast} from "react-toastify";
import {RESET_PASSWORD_URL} from '../constants/apiEndpoints';
import Cookies from 'js-cookie';
import handleErrorToast from '../helpers/handleErrorToast';


export default async function resetPasswordApi(password, confirmPassword, token) {
    let body = {
        'password': password,
    };
    let config = setAxiosConfig('POST', RESET_PASSWORD_URL, true);

    config['data'] = body;
    config['headers']['Authorization'] = `Bearer ${token}`;
    if (!password) {
        toast.error("password field is blank");
        return;
    }
    if (password !== confirmPassword) {
        toast.error("The two password are not identical");
        return;
    }
    return await axios(config).then((response) => {

        if (response.status === 200) {
            Cookies.set('jwt', response.data.access_token.token);
            return response.data;
        } else {
            toast.warn(response.data.message);
        }
    }).catch((error) => {
        handleErrorToast(error);
    });
}
