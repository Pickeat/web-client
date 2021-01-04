// const BASE_URL = "https://dev-api.pickeat.fr";
const BASE_URL = "https://api.pickeat.fr";
//const BASE_URL = "https://localhost:3000";

export const SIGN_IN_URL = BASE_URL + '/auth/login';
export const SIGN_UP_URL = BASE_URL + '/auth/register';
export const FORGOT_PASSWORD_URL = BASE_URL + '/users/forgot_password';
export const UPDATE_PHONE_URL = BASE_URL + '/users/update_phone'
export const UPDATE_MAIL_URL = BASE_URL + '/users/update_email'
export const RESET_PASSWORD_URL = BASE_URL + '/users/reset-password';
export const DELETE_ACCOUNT_URL = BASE_URL + '/users/delete';
export const UPDATE_PASSWORD_URL = BASE_URL + '/users/password';
export const GET_PRODUCT_LIST_URL = BASE_URL + '/announces';
export const PRODUCT_URL = BASE_URL + '/announces';
export const USER_PUBLIC_INFO_URL = BASE_URL + '/users/public_infos';
export const FACEBOOK_CONNECT_URL = BASE_URL + '/auth/facebook';
export const GOOGLE_CONNECT_URL = BASE_URL + '/auth/google';
export const POST_PRODUCT_IMAGE = BASE_URL + '/announces_picture';