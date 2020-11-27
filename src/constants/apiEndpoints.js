// const BASE_URL = "https://dev-api.pickeat.fr";
const BASE_URL = process.env.REACT_APP_BASE_URL_API_LINK;

export const SIGN_IN_URL = BASE_URL + '/auth/login';
export const SIGN_UP_URL = BASE_URL + '/auth/register';
export const FORGOT_PASSWORD_URL = BASE_URL + '/users/forgot_password';
export const RESET_PASSWORD_URL = BASE_URL + '/users/reset-password';
export const GET_PRODUCT_LIST_URL = BASE_URL + '/announces';
