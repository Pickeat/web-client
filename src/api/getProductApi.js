import setAxiosConfig from "../helpers/setAxiosConfig";
import axios from "axios";
import {toast} from "react-toastify";
import {PRODUCT_URL} from '../constants/apiEndpoints';
import handleErrorToast from '../helpers/handleErrorToast';

export default async function getProductApi(id) {
    let config = setAxiosConfig('GET', `${PRODUCT_URL}/${id}`, false);

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
