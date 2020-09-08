import Cookies from 'universal-cookie';

export default function isAuth() {
    const cookies = new Cookies();
    let jwt = cookies.get('jwt');

    return (jwt);
};
