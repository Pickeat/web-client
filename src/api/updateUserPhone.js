import setAxiosConfig from '../helpers/setAxiosConfig';
import axios from 'axios';
import { toast } from 'react-toastify';
import { UPDATE_PHONE_URL } from '../constants/apiEndpoints';
import Cookies from 'js-cookie';
import handleErrorToast from '../helpers/handleErrorToast';

async function sendRequest(config) {
  let token = Cookies.get('jwt');

  config['headers']['Authorization'] = `Bearer ${token}`;

  return await axios(config)
    .then((response) => {
      if (response.status === 204) {
        toast.success('Votre numéro de téléphone a été modifié avec succès');
        return true;
      } else {
        toast.warn(response.data.message);
      }
    })
    .catch((error) => {
      handleErrorToast(error);
      return false;
    });
}

export default async function updateUserPhoneApi(newPhone) {
  let body = {
    phoneNumber: newPhone,
  };
  let config = setAxiosConfig('PUT', UPDATE_PHONE_URL, true);

  config['data'] = body;

  return sendRequest(config);
}
