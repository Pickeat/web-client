import setAxiosConfig from "../helpers/setAxiosConfig";
import axios from "axios";
import {toast} from "react-toastify";
import {DELETE_ACCOUNT_URL} from '../constants/apiEndpoints';
import Cookies from 'js-cookie';
import handleErrorToast from '../helpers/handleErrorToast';

async function sendRequest(config) {
    let token = Cookies.get('jwt');

    config['headers']['Authorization'] = `Bearer ${token}`;

    return await axios(config).then((response) => {
        if (response.status === 204) {
            toast.success("Email confirmation has been sent")
            return response.data;
        } else {
            toast.warn(response.data.message);
        }
    }).catch((error) => {
        handleErrorToast(error);
    });
}

export default async function deleteUserAccountApi(userPassword) {
    let body = {
        'password': userPassword,
    };
    let config = setAxiosConfig('DELETE', DELETE_ACCOUNT_URL, false);

    config['data'] = body;

    return sendRequest(config);
}
