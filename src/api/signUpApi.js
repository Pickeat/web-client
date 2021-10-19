import setAxiosConfig from '../helpers/setAxiosConfig';
import axios from 'axios';
import { toast } from 'react-toastify';
import { SIGN_UP_URL } from '../constants/apiEndpoints';
import Cookies from 'js-cookie';
import handleErrorToast from '../helpers/handleErrorToast';

export default async function signUpApi(email, password, confirmPassword, phone, age, name) {
  let body = {
    email: email,
    password: password,
    phone_number: phone,
    age: age,
    name: name,
  };
  let config = setAxiosConfig('POST', SIGN_UP_URL, true);

  config['data'] = body;
  if (password !== confirmPassword) {
    toast.error('Les deux mots de passe ne sont pas identiques');
    return false;
  }
  if (!email || !password || !age) {
    toast.error('Un ou plusieurs champs sont vides');
    return false;
  }
  if (age < 18) {
    toast.error('Vous devez avoir au moins 18 ans pour vous inscrire sur Pickeat');
    return false;
  }
  return await axios(config)
    .then((response) => {
      if (response.status === 200) {
        Cookies.set('jwt', response.data.access_token.token);
        return true;
      } else {
        toast.warn(response.data.message);
      }
    })
    .catch((error) => {
      handleErrorToast(error);
    });
}
