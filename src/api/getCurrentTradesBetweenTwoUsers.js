import setAxiosConfig from "../helpers/setAxiosConfig";
import axios from "axios";
import {toast} from "react-toastify";
import {GET_CURRENT_TRADES} from '../constants/apiEndpoints';
import handleErrorToast from '../helpers/handleErrorToast';

export default async function getCurrentTradesBetweenTwoUsers(user_id_one, user_id_two) {
    let config = setAxiosConfig('POST', `${GET_CURRENT_TRADES}`, false);

    try {
        config['data'] = {
            giverId: user_id_two,
            pickerId: user_id_one,
        };
        let response = await axios(config);
        let firstPartOfList = [];
        if (response.status === 200) {
            firstPartOfList = response.data;
        } else {
            toast.warn(response.data.message);
            return false
        }
        config['data'] = {
            giverId: user_id_one,
            pickerId: user_id_two,
        };
        let secondPartOfList = [];
        response = await axios(config);
        if (response.status === 200) {
            secondPartOfList = response.data;
        } else {
            toast.warn(response.data.message);
            return false
        }
        return [...firstPartOfList, ...secondPartOfList];
    } catch (error) {
        handleErrorToast(error);
        return false
    }
}
