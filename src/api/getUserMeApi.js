import setAxiosConfig from "../helpers/setAxiosConfig";
import axios from "axios";
import {toast} from "react-toastify";
import {GET_USER_ME} from '../constants/apiEndpoints';
import handleErrorToast from '../helpers/handleErrorToast';
import Cookies from 'js-cookie';

export default async function getUserMeApi() {
    let config = setAxiosConfig('GET', `${GET_USER_ME}`, false);
    let token = Cookies.get('jwt');

    config['headers']['Authorization'] = `Bearer ${token}`;

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
