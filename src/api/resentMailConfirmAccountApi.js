import setAxiosConfig from "../helpers/setAxiosConfig";
import axios from "axios";
import {toast} from "react-toastify";
import {POST_SENT_CONFIRM_EMAIL} from '../constants/apiEndpoints';
import handleErrorToast from '../helpers/handleErrorToast';
import Cookies from "js-cookie";


export default async function resentMailConfirmAccountApi() {
    let body = {};
    let token = Cookies.get('jwt');
    let config = setAxiosConfig('POST', POST_SENT_CONFIRM_EMAIL, true);

    config['data'] = body;
    config['headers']['Authorization'] = `Bearer ${token}`;

    return await axios(config).then((response) => {

        if (response.status === 204) {
            return true;
        } else {
            toast.warn(response.data.message);
            return false
        }
    }).catch((error) => {
        handleErrorToast(error);
        return false
    });
}
