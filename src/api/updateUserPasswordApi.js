import setAxiosConfig from "../helpers/setAxiosConfig";
import axios from "axios";
import {toast} from "react-toastify";
import {UPDATE_PASSWORD_URL} from '../constants/apiEndpoints';
import Cookies from 'js-cookie';
import handleErrorToast from '../helpers/handleErrorToast';

async function sendRequest(config) {
    let token = Cookies.get('jwt');

    config['headers']['Authorization'] = `Bearer ${token}`;

    return await axios(config).then((response) => {
        if (response.status === 204) {
            toast.success("Sucessfully updated password")
            return response.data;
        } else {
            toast.warn(response.data.message);
        }
    }).catch((error) => {
        handleErrorToast(error);
    });
}

export default async function updateUserPasswordCallApi(oldPassword, newPassword) {
    let body = {
        'newPassword': newPassword,
        'oldPassword': oldPassword
    };
    let config = setAxiosConfig('POST', UPDATE_PASSWORD_URL, true);

    config['data'] = body;

    return sendRequest(config);
}
