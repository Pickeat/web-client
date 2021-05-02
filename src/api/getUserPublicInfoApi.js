import setAxiosConfig from "../helpers/setAxiosConfig";
import axios from "axios";
import {toast} from "react-toastify";
import {USER_PUBLIC_INFO_URL} from '../constants/apiEndpoints';
import Cookies from 'js-cookie';
import handleErrorToast from '../helpers/handleErrorToast';

async function sendRequest(config) {
    let token = Cookies.get('jwt');

    config['headers']['Authorization'] = `Bearer ${token}`;

    return await axios(config).then((response) => {
        if (response.status === 200) {
            console.log(response)
            return response.data;
        } else {
            toast.warn(response.data.message);
        }
    }).catch((error) => {
        handleErrorToast(error);
    });
}

export default async function getUserPublicInfoApi() {
    let config = setAxiosConfig('GET', USER_PUBLIC_INFO_URL, false);

    return sendRequest(config);
}
