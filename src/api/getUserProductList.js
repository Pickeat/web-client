import setAxiosConfig from "../helpers/setAxiosConfig";
import axios from "axios";
import {toast} from "react-toastify";
import {GET_PRODUCT_LIST_URL} from '../constants/apiEndpoints';
import handleErrorToast from '../helpers/handleErrorToast';

export default async function getProductList() {
    let config = setAxiosConfig('GET', `${GET_PRODUCT_LIST_URL}_me`, false);

    config['data'] = {
        status: 'waiting-for-reservation'
    };

    console.log(config);
    return await axios(config).then((response) => {
        if (response.status === 200) {
            return response.data;
        } else {
            toast.warn(response.data.message);
        }
    }).catch((error) => {
        handleErrorToast(error);
    });
}
