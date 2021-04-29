import setAxiosConfig from "../helpers/setAxiosConfig";
import axios from "axios";
import {toast} from "react-toastify";
import {DELETE_ANNOUNCE_URL} from '../constants/apiEndpoints';
import handleErrorToast from '../helpers/handleErrorToast';
import Cookies from "js-cookie";

export default async function deleteAnnounceApi(id) {
    let config = setAxiosConfig('DELETE', `${DELETE_ANNOUNCE_URL}/${id}`, false);

    let token = Cookies.get('jwt');

    config['headers']['Authorization'] = `Bearer ${token}`;

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
