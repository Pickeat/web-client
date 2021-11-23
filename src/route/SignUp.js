import React, { useState } from 'react';
import Logo from '../assets/logo.png';
import { makeStyles } from '@material-ui/core/styles';
import signUpApi from '../api/signUpApi';
import postGoogleLogin from '../api/postGoogleLogin';
import postFacebookLogin from '../api/postFacebookLogin';
import {GoogleLogin} from "react-google-login";
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

const useStyles = makeStyles((theme) => ({
  main: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    height: 'auto',
    width: '40%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  avatar: {
    backgroundColor: 'transparent',
    marginTop: '35px',
    width: '100px',
    height: '100px',
  },
  titleContainer: {
    marginTop: '22px',
  },
  form: {
    marginTop: '10px',
    width: '70%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  submit: {
    backgroundColor: '#c4d82f',
    '&:hover': {
      backgroundColor: '#8bb535',
    },
  },
}));

export default function SignUp(props) {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [name, setName] = useState('');

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

  const signUpApiCall = (email, password, confirmPassword, phone, age, name) => {
    signUpApi(email, password, confirmPassword, phone, age, name).then((response) => {
      console.log(response);
      if (!response) return;
      props.history.push('/product-list');
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img className="mx-auto h-12 w-auto" alt="PickEat Logo" src={Logo}/>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Créer votre compte</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" action="#" method="POST">

          <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Nom
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="name"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  onChange={(event => setName(event.target.value))}
                />
              </div>
            </div>

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
                  onChange={(event => setEmail(event.target.value))}
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
                  onChange={(event => setPassword(event.target.value))}
                />
              </div>
            </div>

            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                Confirmation du mot de passe
              </label>
              <div className="mt-1">
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  onChange={(event => setConfirmPassword(event.target.value))}
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Téléphone
              </label>
              <div className="mt-1">
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+33"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  onChange={(event => setPhone(event.target.value))}
                />
              </div>
            </div>

            <div>
              <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                Age
              </label>
              <div className="mt-1">
                <input
                  id="age"
                  name="age"
                  type="age"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  onChange={(event => setAge(event.target.value))}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  signUpApiCall(email, password, confirmPassword, phone, age, name)
              }}
              >
                Rejoindre Pickeat
              </button>
              <button
                    type="submit"
                    className="mt-2 w-full flex justify-center py-2 px-4 border-green-600 hover:border-green-700 border border-transparent rounded-md shadow-sm text-sm font-medium text-green-600 hover:text-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    onClick={(e) => {
                        e.preventDefault();
                        props.history.push('/');
                    }}
                  >
                    J'ai déjà un compte
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
  )

/*   return (
    <div className={classes.main}>
      <Paper elevation={24} className={classes.container}>
        <div className={classes.titleContainer}>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
        </div>
        <form className={classes.form}>
          <PickeatTextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoFocus
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <PickeatTextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <PickeatTextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirm-password"
            label="Confirm Password"
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
          <PickeatTextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="phone"
            label="Phone"
            type="phone"
            id="phone"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
          />
          <PickeatTextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="name"
            label="Name"
            type="text"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <PickeatTextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="age"
            label="Age"
            type="age"
            id="age"
            value={age}
            onChange={(event) => setAge(event.target.value)}
          />
          <Button
            style={{ marginTop: '20px', marginBottom: '20px', width: '50%' }}
            type="submit"
            variant="contained"
            color="primary"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              signUpApiCall(email, password, confirmPassword, phone, age, name);
            }}
            className={classes.submit}
          >
            Sign Up
          </Button>
        </form>
      </Paper>
    </div>
  ); */
}
