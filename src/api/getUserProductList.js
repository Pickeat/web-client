import setAxiosConfig from "../helpers/setAxiosConfig";
import axios from "axios";
import {toast} from "react-toastify";
import { GET_PRODUCT_LIST_URL , USER_ME} from '../constants/apiEndpoints';
import handleErrorToast from '../helpers/handleErrorToast';

export default async function getProductList() {
    let config = setAxiosConfig('GET', `${USER_ME}`, false);
    let user_id;

    await axios(config).then((response) => {
        if (response.status === 200) {
            user_id = response.data._id;
        } else {
            toast.warn(response.data.message);
        }
    }).catch((error) => {
        handleErrorToast(error);
    });

    config = setAxiosConfig('GET', `${GET_PRODUCT_LIST_URL}`, false);
    config['params'] = {user_id: user_id};

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
