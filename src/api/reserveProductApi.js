import setAxiosConfig from "../helpers/setAxiosConfig";
import axios from "axios";
import {toast} from "react-toastify";
import { RESERVE_URL } from '../constants/apiEndpoints';
import handleErrorToast from '../helpers/handleErrorToast';

export default async function reserveProductApi() {
    let config = setAxiosConfig('POST', `${RESERVE_URL}`, false);

    config['data'] = "";
    return await axios(config).then(async (response) => {
        if (response.status === 200) {
            return true;
        } else {
            toast.warn(response.data.message);
        }
    }).catch((error) => {
        handleErrorToast(error);
        return false;
    });
}
