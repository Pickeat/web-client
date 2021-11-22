import setAxiosConfig from '../helpers/setAxiosConfig';
import axios from 'axios';
import { toast } from 'react-toastify';
import { USER_PRIVATE_INFO_URL } from '../constants/apiEndpoints';
import Cookies from 'js-cookie';
import handleErrorToast from '../helpers/handleErrorToast';

async function sendRequest(config) {
  let token = Cookies.get('jwt');

  config['headers']['Authorization'] = `Bearer ${token}`;

  return await axios(config)
    .then((response) => {
      if (response.status === 204) {
        return true;
      } else {
        toast.warn(response.data.message);
      }
    })
    .catch((error) => {
      handleErrorToast(error);
    });
}

export default async function setUserPrivateInfoApi(data) {
  let body = {};
  if (data) {
    if (data.language) body['language'] = data.language;
    if (data.food_preferences) body['food_preferences'] = data.food_preferences;
    if (data.food_blacklist) body['food_blacklist'] = data.food_blacklist;
  }

  let config = setAxiosConfig('PUT', USER_PRIVATE_INFO_URL, true);

  config['data'] = body;

  return sendRequest(config);
}
