import setAxiosConfig from "../helpers/setAxiosConfig";
import axios from "axios";
import {toast} from "react-toastify";
import {UPDATE_PHONE_URL, UPDATE_USER_PICTURE_URL} from '../constants/apiEndpoints';
import Cookies from 'js-cookie';
import handleErrorToast from '../helpers/handleErrorToast';

async function sendRequest(config) {
    let token = Cookies.get('jwt');

    config['headers']['Authorization'] = `Bearer ${token}`;

    return await axios(config).then((response) => {
        if (response.status === 204) {
            toast.success("Picture succesfully updated")
            return response.data;
        } else {
            toast.warn(response.data.message);
        }
    }).catch((error) => {
        handleErrorToast(error);
    });
}

export default async function updateUserPicture(newPicture) {
    let config = setAxiosConfig('POST', UPDATE_USER_PICTURE_URL, true);
    const formData = new FormData();

    if (!newPicture) {
        toast.error("Required picture file");
        return;
    }
    formData.append('file', newPicture[0]);
    config['headers']['Content-Type'] = 'multipart/form-data';
    config['data'] = formData;
    return sendRequest(config);
}
