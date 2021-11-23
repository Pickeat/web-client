import setAxiosConfig from '../helpers/setAxiosConfig';
import axios from 'axios';
import { toast } from 'react-toastify';
import { GET_DETAILED_NOTES } from '../constants/apiEndpoints';
import Cookies from 'js-cookie';
import handleErrorToast from '../helpers/handleErrorToast';

async function sendRequest(config) {
  let token = Cookies.get('jwt');

  config['headers']['Authorization'] = `Bearer ${token}`;

  return await axios(config)
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      } else {
        toast.warn(response.data.message);
        return null;
      }
    })
    .catch((error) => {
      handleErrorToast(error);
      return null;
    });
}

export default async function getDetailedNotes(id) {
  let config = setAxiosConfig('GET', `${GET_DETAILED_NOTES}/${id}`, false);

  return sendRequest(config);
}
