import setAxiosConfig from "../helpers/setAxiosConfig";
import axios from "axios";
import {toast} from "react-toastify";
import { POST_PRODUCT_IMAGE, PRODUCT_URL } from '../constants/apiEndpoints';
import handleErrorToast from '../helpers/handleErrorToast';

async function  createProduct(imageRef, title, description, date, labels){
    let config = setAxiosConfig('POST', `${PRODUCT_URL}`, false);
    let body = {
        title: title,
        image: imageRef
    };
    if (description)
        body.description = description;
    if (date)
        body.expiration_date  = date;
    if (labels.length > 0)
        body.description = description;
    config['data'] = body;

    return await axios(config).then((response) => {
        if (response.status === 201) {
            return response.data;
        } else {
            toast.warn(response.data.message);
        }
    }).catch((error) => {
        handleErrorToast(error);
        return null;
    });
}


export default async function addProductApi(file, title, description, date, labels) {
    let config = setAxiosConfig('POST', `${POST_PRODUCT_IMAGE}`, false);
    const formData = new FormData();

    if (!title || !file) {
        toast.error("One or more required field(s) is/are missing");
        return;
    }
    formData.append('file', file);
    config['headers']['Content-Type'] = 'multipart/form-data';
    config['data'] = formData;
    return createProduct("toto", title, description, date, labels);
    return await axios(config).then(async (response) => {
        if (response.status === 201) {
            console.log(response.data);
            //return await createProduct(response.data.name, title, description, date, labels);
            return "toto";
        } else {
            toast.warn(response.data.message);
        }
    }).catch((error) => {
        handleErrorToast(error);
    });
}
