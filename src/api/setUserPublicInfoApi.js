import setAxiosConfig from "../helpers/setAxiosConfig";
import axios from "axios";
import {toast} from "react-toastify";
import {USER_PUBLIC_INFO_URL} from '../constants/apiEndpoints';
import Cookies from 'js-cookie';
import handleErrorToast from '../helpers/handleErrorToast';

async function sendRequest(config) {
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

export default async function setUserPublicInfoApi(name, description, availability, userBirthday, userGender) {
    let body = {};
    if (name)
        body['name'] = name
    if (description)
        body['description'] = description
    if (availability)
        body['availability'] = availability
    if (userBirthday)
        body['age'] = userBirthday
    if (userGender)
        body['gender'] = userGender

    let config = setAxiosConfig('PUT', USER_PUBLIC_INFO_URL, true);

    config['data'] = body;

    return sendRequest(config);
}
