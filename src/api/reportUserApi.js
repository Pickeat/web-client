import setAxiosConfig from "../helpers/setAxiosConfig";
import axios from "axios";
import {toast} from "react-toastify";
import {POST_REPORT_USER_URL} from '../constants/apiEndpoints';
import handleErrorToast from '../helpers/handleErrorToast';
import Cookies from "js-cookie";

async function sendRequest(config) {
    let token = Cookies.get('jwt');

    config['headers']['Authorization'] = `Bearer ${token}`;

    return await axios(config).then((response) => {
        if (response.status === 200) {
            toast.success("User wil be reported")
            return response.data;
        } else {
            toast.warn(response.data.message);
        }
    }).catch((error) => {
        handleErrorToast(error);
    });
}

export default async function postReportUserApi(id) {
    let config = setAxiosConfig('POST', POST_REPORT_USER_URL, false);

    config['data'] = {
        id: id,
        details: "Reported user" + id
    };
    return sendRequest(config);
}
