import React, { useState } from 'react';
import Logo from '../assets/logo.png';
import { makeStyles } from '@material-ui/core/styles';
import signInApi from '../api/signInApi';
import postGoogleLogin from '../api/postGoogleLogin';
import postFacebookLogin from '../api/postFacebookLogin';
import getMyReservedAnnounces from '../api/getMyReservedAnnounces';
import {GoogleLogin} from "react-google-login";
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { toast } from 'react-toastify';

const useStyles = makeStyles((theme) => ({
  main: {
    paddingTop: '5rem',
    boxSizing: 'border-box',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '60%',
    width: '40%',
  },
  avatar: {
    backgroundColor: 'transparent',
    height: 'auto',
    width: '15%',
    marginBottom: '2%',
  },
  form: {
    width: '70%', // Fix IE 11 issue.
    height: '50%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
}));

export default function SignIn(props) {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const responseGoogle = (response) => {
    postGoogleLogin(response.tokenObj.id_token).then((response) => {
      props.history.push('/product-list');
    });
  };

  const responseFacebook = (response) => {
    postFacebookLogin(response.accessToken).then((response) => {
      props.history.push('/product-list');
    });
  };

  const loginApiCall = (email, password) => {
    if (!email || !password) {
      toast.error('Le champ email ou mot de passe est vide');
      return;
    }
    signInApi(email, password).then((response) => {
      console.log(response);
      if (!response) return;
      getMyReservedAnnounces(['given']).then((res) => {
        if (res.length === 0) return;
        props.history.push(`/rate-your-giver/${res[0]?._id}`);
      });
      props.history.push('/product-list');
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img className="mx-auto h-12 w-auto" alt="PickEat Logo" src={Logo} />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Connexion à votre compte
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  autoFocus
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Mot de passe
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <a href="/#/forgot-password" className="font-medium text-green-600 hover:text-green-500">
                  Mot de passe oublié
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  loginApiCall(email, password);
                }}
              >
                Se connecter
              </button>
              <button
                type="submit"
                className="mt-2 w-full flex justify-center py-2 px-4 border-green-600 hover:border-green-700 border border-transparent rounded-md shadow-sm text-sm font-medium text-green-600 hover:text-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                onClick={(e) => {
                  e.preventDefault();
                  props.history.push('/sign-up');
                }}
              >
                Créer un compte
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Ou continuer avec</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-2">
              <div>
              <GoogleLogin
                        clientId={process.env.REACT_APP_GOOGLE_LOGIN_CLIENT_ID}
                        buttonText="Login with Google"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        render={renderProps => (
                          <a
                          onClick={renderProps.onClick}
                            href="#"
                            className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                          >
                            <span className="sr-only">Connexion avec Google</span>
                            <svg
                              className="w-5 h-5"
                              aria-hidden="true"
                              data-icon="google"
                              viewBox="0 0 488 512"
                            >
                              <path
                                fill="currentColor"
                                d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                              />
                            </svg>
                          </a>
                        )}
                        scope={[
                            "profile",
                            "email",
                            "https://www.googleapis.com/auth/user.phonenumbers.read",
                            "https://www.googleapis.com/auth/user.addresses.read",
                        ].join(" ")}
                        cookiePolicy={'single_host_origin'}
                    />
                
              </div>
              
              <div>
              <FacebookLogin
                        style={{width: '4000px'}}
                        appId={process.env.REACT_APP_FACEBOOK_LOGIN_APP_ID}
                        fields="name,email,picture"
                        render={renderProps => (
                          <a
                          onClick={(e) => {e.preventDefault(); renderProps.onClick}}
                            href="#"
                            className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                          >
                            <span className="sr-only">Connexion avec Facebook</span>
                            <svg
                              className="w-5 h-5"
                              aria-hidden="true"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
                                clipRule="evenodd"
                              />
                          </svg>
                        </a>
                        )}
                        callback={responseFacebook}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  /*     return (
        <div className={classes.main}>
            <Background/>
            <Paper elevation={24} className={classes.container}>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form}>
                    <PickeatTextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={(event => setEmail(event.target.value))}
                    />
                    <div style={{width: '100%', paddingBottom: '8%'}}>
                        <PickeatTextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(event => setPassword(event.target.value))}
                        />
                        <Link style={{color: 'black'}} to="forgot-password">Forgot password ?</Link>
                    </div>
                    <Button
                        style={{width: '50%'}}
                        type="submit"
                        variant="contained"
                        color="primary"
                        onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            loginApiCall(email, password)
                        }}
                        className="pickeatBtn"
                    >
                        Sign In
                    </Button>

                </form>
                <div style={{width: '400px', height: '10%', margin: 20, display: 'flex', justifyContent: 'space-between'}}>
                    <GoogleLogin
                        clientId={process.env.REACT_APP_GOOGLE_LOGIN_CLIENT_ID}
                        buttonText="Login with Google"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        scope={[
                            "profile",
                            "email",
                            "https://www.googleapis.com/auth/user.phonenumbers.read",
                            "https://www.googleapis.com/auth/user.addresses.read",
                        ].join(" ")}
                        cookiePolicy={'single_host_origin'}
                    />
                    <FacebookLogin
                        style={{width: '4000px'}}
                        appId={process.env.REACT_APP_FACEBOOK_LOGIN_APP_ID}
                        fields="name,email,picture"
                        render={renderProps => (
                            <Button variant="outlined" color="primary" onClick={renderProps.onClick}>Login with
                                Facebook</Button>
                        )}
                        callback={responseFacebook}/>
                </div>
            </Paper>
        </div>
    ); */
}
