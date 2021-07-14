import setAxiosConfig from "../helpers/setAxiosConfig";
import axios from "axios";
import {toast} from "react-toastify";
import {GET_PRODUCT_LIST_URL} from '../constants/apiEndpoints';
import handleErrorToast from '../helpers/handleErrorToast';

export default async function getProductList(size, page, search, km, location, minRate, maxDate) {
    const config = setAxiosConfig('GET', `${GET_PRODUCT_LIST_URL}`, false);

    config['params'] = {};
    if (location.lat && location.lng && km) {
        config['params'].lng = location.lng;
        config['params'].lat = location.lat;
        config['params'].radius = km * 1000;
    } else {
        return {};
    }
    if (minRate)
        config['params'].min_rate = minRate;
    if (maxDate)
        config['params'].expiration_date = maxDate;
    if (search)
        config['params'].search = search
    config['params'].size = size;
    config['params'].page = page;

    return await axios(config).then((response) => {
        if (response.status === 200) {
            return response.data;
        } else {
            toast.warn(response.data.message);
            return {};
        }
    }).catch((error) => {
        handleErrorToast(error);
        return {};
    });
}
