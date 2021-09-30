import setAxiosConfig from "../helpers/setAxiosConfig";
import axios from "axios";
import {toast} from "react-toastify";
import {ADD_PRODUCT_URL_BAR_CODE} from '../constants/apiEndpoints';
import handleErrorToast from '../helpers/handleErrorToast';

export default async function getProductWithBarCode(code) {
    let config = setAxiosConfig('GET', `${ADD_PRODUCT_URL_BAR_CODE}/${code}`, false);

    return await axios(config).then((response) => {
        if (response.status === 200) {
            return response.data;
        } else {
            toast.warn(response.data.message);
            return false
        }
    }).catch((error) => {
        handleErrorToast(error);
        return false
    });
}
