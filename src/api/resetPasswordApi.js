import setAxiosConfig from '../helpers/setAxiosConfig';
import axios from 'axios';
import { toast } from 'react-toastify';
import { RESET_PASSWORD_URL } from '../constants/apiEndpoints';
import handleErrorToast from '../helpers/handleErrorToast';

export default async function resetPasswordApi(password, confirmPassword, token) {
  let body = {
    password: password,
  };
  let config = setAxiosConfig('POST', RESET_PASSWORD_URL, true);

  config['data'] = body;
  config['headers']['Authorization'] = `Bearer ${token}`;
  if (!password) {
    toast.error('Le champ mot de passe est vide');
    return false;
  }
  if (password !== confirmPassword) {
    toast.error('Les deux mots de passe ne sont pas identiques');
    return false;
  }
  return await axios(config)
    .then((response) => {
      if (response.status === 204) {
        return response;
      } else {
        toast.warn(response.data.message);
        return false;
      }
    })
    .catch((error) => {
      handleErrorToast(error);
      return false;
    });
}
