import setAxiosConfig from "../helpers/setAxiosConfig";
import axios from "axios";
import {toast} from "react-toastify";
import {GOOGLE_CONNECT_URL} from '../constants/apiEndpoints';
import handleErrorToast from '../helpers/handleErrorToast';
import Cookies from "js-cookie";

export default async function postGoogleLogin(token) {
    let body = {
        'token': token,
    };
    let config = setAxiosConfig('POST', GOOGLE_CONNECT_URL, true);
    config['data'] = body;
    return await axios(config).then((response) => {
        if (response.status === 200) {
            Cookies.set('jwt', response.data.access_token.token);
            Cookies.set('user_id', response.data.user_id);
            return response.data;
        } else {
            toast.warn(response.data.message);
        }
    }).catch((error) => {
        handleErrorToast(error);
    });
}
