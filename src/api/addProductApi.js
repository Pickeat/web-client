import setAxiosConfig from "../helpers/setAxiosConfig";
import axios from "axios";
import {toast} from "react-toastify";
import { POST_PRODUCT_IMAGE, PRODUCT_URL } from '../constants/apiEndpoints';
import handleErrorToast from '../helpers/handleErrorToast';

async function  createProduct(imageRef, title, location, description, date, labels){
    let config = setAxiosConfig('POST', `${PRODUCT_URL}`, false);
    let body = {
        title: title,
        image: imageRef,
        //location: {lat: 44.74139350672183, lng: -1.0996778355235528}
        location: location
    };
    if (description)
        body.description = description;
    if (date)
        body.expiration_date  = date;
    if (labels.length > 0)
        body.labels = labels;
    config['data'] = body;

    return await axios(config).then((response) => {
        if (response.status === 204) {
            return response.data;
        } else {
            toast.warn(response.data.message);
        }
    }).catch((error) => {
        handleErrorToast(error);
        return null;
    });
}


export default async function addProductApi(file, title, location, description, date, labels) {
    let config = setAxiosConfig('POST', `${POST_PRODUCT_IMAGE}`, false);
    const formData = new FormData();
    console.log(location);

    if (!title || !file || !location) {
        toast.error("One or more required field(s) is/are missing");
        return;
    }
    formData.append('file', file);
    config['headers']['Content-Type'] = 'multipart/form-data';
    config['data'] = formData;
    return await axios(config).then(async (response) => {
        if (response.status === 200) {
            console.log(response.data);
            return await createProduct(response.data.name, title, location, description, date, labels);
        } else {
            toast.warn(response.data.message);
        }
    }).catch((error) => {
        handleErrorToast(error);
    });
}
