import setAxiosConfig from "../helpers/setAxiosConfig";
import axios from "axios";
import {toast} from "react-toastify";
import { POST_EDIT_ANNOUNCE_URL} from '../constants/apiEndpoints';
import handleErrorToast from '../helpers/handleErrorToast';

export default async function postEditAnnounceApi(id, productTitle, productDescription, productExpirationDate) {
    let config = setAxiosConfig('PUT', `${POST_EDIT_ANNOUNCE_URL}/${id}`, false);

    config['data'] = {
        title: productTitle,
        description: productDescription,
        expiration_date: productExpirationDate
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
