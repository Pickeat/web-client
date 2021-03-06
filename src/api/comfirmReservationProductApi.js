import setAxiosConfig from "../helpers/setAxiosConfig";
import axios from "axios";
import {toast} from "react-toastify";
import {CONFIRM_RESERVE_URL} from '../constants/apiEndpoints';
import handleErrorToast from '../helpers/handleErrorToast';

export default async function confirmProductReservationApi(id) {
    let config = setAxiosConfig('POST', `${CONFIRM_RESERVE_URL}/${id}`, false);

    config['data'] = {
        confirm: true
    };
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
