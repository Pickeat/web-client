import setAxiosConfig from "../helpers/setAxiosConfig";
import axios from "axios";
import {toast} from "react-toastify";
import { SIGN_IN_URL } from '../constants/apiEndpoints';
import Cookies from 'js-cookie';
import handleErrorToast from '../helpers/handleErrorToast';


export default async function signInApi(email, password) {
  let body = {
    'email': email,
    'password': password
  };
  let config = setAxiosConfig('POST', SIGN_IN_URL, true);

  config['data'] = body;
  if (!email || !password) {
    toast.error("One or more field(s) is/are blank");
    return;
  }
  return await axios(config).then((response) => {

    if (response.status === 200) {
      Cookies.set('jwt', response.data.access_token.token);
      Cookies.set('user_id', response.data.user_id);
      return response.data;
    } else {
      toast.warn(response.data.message);
    }
  }).catch((error) => {
    handleErrorToast(error);
  });
}
