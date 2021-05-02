import setAxiosConfig from "../helpers/setAxiosConfig";
import axios from "axios";
import {toast} from "react-toastify";
import {DELETE_CONFIRM_ACCOUNT} from '../constants/apiEndpoints';
import handleErrorToast from '../helpers/handleErrorToast';


export default async function confirmDeleteAccountApi(confirmToken) {
    let body = {};
    let config = setAxiosConfig('DELETE', DELETE_CONFIRM_ACCOUNT, true);

    config['data'] = body;
    config['headers']['Authorization'] = `Bearer ${confirmToken}`;

    return await axios(config).then((response) => {

        if (response.status === 204) {
            toast.success(response.status.message);
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
