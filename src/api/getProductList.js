import setAxiosConfig from "../helpers/setAxiosConfig";
import axios from "axios";
import {toast} from "react-toastify";
import { GET_PRODUCT_LIST_URL } from '../constants/apiEndpoints';

export default async function getProductList(km) {
  let config = setAxiosConfig('GET', GET_PRODUCT_LIST_URL, false);
  //TODO: send user pos and km distance
  console.log(km);

  return await axios(config).then((response) => {
    if (response.status === 200) {
      return ([1, 1, 1, 1, 1, 1, 1, 1]);
//      return response.data;
    } else {
      toast.warn(response.data.message);
    }
  }).catch((error) => {
    toast.error(error.response.data.description);
  });
}
