import setAxiosConfig from "../helpers/setAxiosConfig";
import axios from "axios";
import {toast} from "react-toastify";
import {GET_MY_PUBLISHED_PRODUCTS_URL} from '../constants/apiEndpoints';
import handleErrorToast from '../helpers/handleErrorToast';

export default async function getMyPublishedAnnounces(status) {
    let url = GET_MY_PUBLISHED_PRODUCTS_URL;

    if (status && status?.length !== 0) {
        url += '?status=';
        status.forEach((elem, index) => {
            url += `${elem}`;
            if (index + 1 < status.length)
                url += ',';
        })
    }
    let config = setAxiosConfig('GET', url, false);

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