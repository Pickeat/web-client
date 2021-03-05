import setAxiosConfig from "../helpers/setAxiosConfig";
import axios from "axios";
import {toast} from "react-toastify";
import { GET_PRODUCT_LIST_URL } from '../constants/apiEndpoints';
import handleErrorToast from '../helpers/handleErrorToast';

export default async function getProductList(km, location, minRate) {
  let config;
  if (location.lng && location.lat && km)
    config = setAxiosConfig('GET', `${GET_PRODUCT_LIST_URL}?lng=${location.lng}&lat=${location.lat}&radius=${km * 1000}`, false);
  else
    config = setAxiosConfig('GET', `${GET_PRODUCT_LIST_URL}`, false);
  config['params'] = {
    lng: location.lng,
    lat: location.lat,
    radius: km * 1000,
    rate: minRate
  };

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
