import setAxiosConfig from "../helpers/setAxiosConfig";
import axios from "axios";
import {toast} from "react-toastify";
import {CONFIRM_EXCHANGE} from '../constants/apiEndpoints';
import handleErrorToast from '../helpers/handleErrorToast';
import Cookies from "js-cookie";


export default async function confirmExchangeApi(id, state) {
    let config = setAxiosConfig('POST', `${CONFIRM_EXCHANGE}/${id}`, false);
    let body = {};
    let token = Cookies.get('jwt');

    config['data'] = body;
    body['confirm'] = state;
    config['headers']['Authorization'] = `Bearer ${token}`;

    return await axios(config).then((response) => {

        if (response.status === 200) {
            // Cookies.set('jwt', response.data.access_token.token);
            return response.data;
        } else {
            toast.warn(response.data.message);
        }
    }).catch((error) => {
        handleErrorToast(error);
    });
}