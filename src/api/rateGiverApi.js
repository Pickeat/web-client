import setAxiosConfig from "../helpers/setAxiosConfig";
import axios from "axios";
import {toast} from "react-toastify";
import { RATE_GIVER_URL } from '../constants/apiEndpoints';
import handleErrorToast from '../helpers/handleErrorToast';

export default async function rateGiverApi(id, note) {
    let config = setAxiosConfig('POST', `${RATE_GIVER_URL}/${id}`, false);

    config['data'] = {
        note: note
    };
    return await axios(config).then(async (response) => {
        if (response.status === 204) {
            return true;
        } else {
            toast.warn(response.data.message);
        }
    }).catch((error) => {
        handleErrorToast(error);
        return false;
    });
}
