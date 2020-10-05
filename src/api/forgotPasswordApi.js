import setAxiosConfig from "../helpers/setAxiosConfig";
import axios from "axios";
import {toast} from "react-toastify";
import {FORGOT_PASSWORD_URL} from '../constants/apiEndpoints';
import Cookies from 'js-cookie';


export default async function forgotPasswordApi(email) {
    let body = {
        'email': email,
    };
    let config = setAxiosConfig('POST', FORGOT_PASSWORD_URL, true);

    config['data'] = body;
    if (!email) {
        toast.error("email field is blank");
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
        toast.error(error.response.data.description);
    });
}
