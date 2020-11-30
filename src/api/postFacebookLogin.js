import setAxiosConfig from "../helpers/setAxiosConfig";
import axios from "axios";
import {toast} from "react-toastify";
import {FACEBOOK_CONNECT_URL} from '../constants/apiEndpoints';
import handleErrorToast from '../helpers/handleErrorToast';
import Cookies from "js-cookie";

export default async function postFacebookLogin(token) {
    let body = {
        'token': token,
    };
    let config = setAxiosConfig('POST', `${FACEBOOK_CONNECT_URL}`, false);
    config['data'] = body;
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
