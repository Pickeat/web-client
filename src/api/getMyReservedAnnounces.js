import setAxiosConfig from "../helpers/setAxiosConfig";
import axios from "axios";
import {toast} from "react-toastify";
import {GET_MY_RESERVE_PRODUCTS_URL} from '../constants/apiEndpoints';
import handleErrorToast from '../helpers/handleErrorToast';

export default async function getMyReservedAnnounces(status) {
    let url = GET_MY_RESERVE_PRODUCTS_URL;

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
            return (response?.data ? response.data : []);
        } else {
            toast.warn(response.data.message);
            return [];
        }
    }).catch((error) => {
        handleErrorToast(error);
        return [];
    });
}