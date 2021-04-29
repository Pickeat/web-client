import setAxiosConfig from "../helpers/setAxiosConfig";
import axios from "axios";
import {toast} from "react-toastify";
import {GET_PRODUCT_LIST_URL} from '../constants/apiEndpoints';
import handleErrorToast from '../helpers/handleErrorToast';

export default async function getProductList(km, location, minRate, maxDate) {
    console.log(km, location, minRate, maxDate);
    const config = setAxiosConfig('GET', `${GET_PRODUCT_LIST_URL}`, false);

    config['params'] = {};
    if (location.lat && location.lng && km) {
        config['params'].lng = location.lng;
        config['params'].lat = location.lat;
        config['params'].radius = km * 1000;
    }
    if (minRate)
        config['params'].min_rate = minRate;
    if (maxDate)
        config['params'].expiration_date = maxDate;

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
