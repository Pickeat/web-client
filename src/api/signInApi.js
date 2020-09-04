import setAxiosConfig from "../helpers/setAxiosConfig";
import axios from "axios";
import {toast} from "react-toastify";
import { SIGN_IN_URL } from '../constants/apiEndpoints';


export default async function signInApi(email, password) {
  let body = {
    'email': email,
    'password': password
  };
  let config = setAxiosConfig('GET', SIGN_IN_URL, true);

  config['data'] = body;
  if (!email || !password) {
    toast.error("One or more field(s) is/are blank");
    return;
  }
  return await axios(config).then((response) => {

    if (response.status === 200) {
      return response.data;
    } else {
      toast.warn(response.data.message);
    }
  }).catch((error) => {
    console.log(error.response);
  });
}
