import setAxiosConfig from '../helpers/setAxiosConfig';
import axios from 'axios';
import { toast } from 'react-toastify';
import { RESERVE_URL } from '../constants/apiEndpoints';
import handleErrorToast from '../helpers/handleErrorToast';

export default async function reserveProductApi(productId, reserveTime) {
  let config = setAxiosConfig('POST', `${RESERVE_URL}/${productId}`, false);
  if (reserveTime !== '') {
    let body = {
      datetime: reserveTime,
    };
    config['data'] = body;
  }

  return await axios(config)
    .then(async (response) => {
      if (response.status === 200) {
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
