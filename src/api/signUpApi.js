import setAxiosConfig from "../helpers/setAxiosConfig";
import axios from "axios";
import {toast} from "react-toastify";
import { SIGN_UP_URL } from '../constants/apiEndpoints';
import Cookies from 'js-cookie'
import handleErrorToast from '../helpers/handleErrorToast';


export default async function signUpApi(email, password, confirmPassword, phone, age) {
  let body = {
    'email': email,
    'password': password,
    'phone_number': phone,
    'age': age
  };
  let config = setAxiosConfig('POST', SIGN_UP_URL, true);

  config['data'] = body;
  if (password !== confirmPassword) {
    toast.error("The two password are not identical");
    return;
  }
  if (!email || !password || !age) {
    toast.error("One or more field(s) is/are blank");
    return;
  }
  if (age < 18) {
    toast.error("You must be over 18 to register on Pickeat");
    return;
  }
  return await axios(config).then((response) => {

    if (response.status === 200) {
      Cookies.set('jwt', response.data.access_token.token);
      return response.data;
    } else {
      toast.warn(response.data.message);
    }
  }).catch((error) => {
    handleErrorToast(error);
  });
}
