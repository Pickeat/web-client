import setAxiosConfig from '../helpers/setAxiosConfig';
import axios from 'axios';
import { toast } from 'react-toastify';
import { PRODUCT_RECOMMENDATIONS_URL } from '../constants/apiEndpoints';
import handleErrorToast from '../helpers/handleErrorToast';

export default async function getRecommendationsApi(location, id) {
  const baseURL = `${PRODUCT_RECOMMENDATIONS_URL}?announce=${id}`;
  const finalURL = location
    ? `${baseURL}&lat=${location[1]}&lng=${location[0]}&radius=35000`
    : baseURL;
  let config = setAxiosConfig('GET', finalURL, false);

  return await axios(config)
    .then((response) => {
      if (response.status === 200) {
        return response.data;
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
