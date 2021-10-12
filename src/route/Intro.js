import React, {useEffect} from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import logo from '../assets/logo.png';
import {Button} from '@material-ui/core';
import {Link} from 'react-router-dom';
import {GoogleLogin} from 'react-google-login';
import postFacebookLogin from "../api/postFacebookLogin";
import postGoogleLogin from "../api/postGoogleLogin";
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import Cookies from "js-cookie";
import Background from "../components/Background";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import {TextFields} from "@material-ui/icons";
import TextField from "@material-ui/core/TextField";
import Logo from '../assets/logo.png';

const useStyles = makeStyles(theme => ({
    palette: {
        text: {
            subtext: 'd6d6d6'
        }
    },
    main: {
        paddingTop: '5rem',
        position: 'relative',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'line',
        height: '100vh',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    LeftSection: {
        display: 'flex',
        height: '100%',
        width: '60%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:"#ececec",
    },
    RightSection: {
        display: 'flex',
        height: '100%',
        width: '40%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    illustration: {
        width: '60%',
        height: '60%',
    },
    // logoContainer: {
    //     width: '33%',
    //     height: '20vh',
    //     maxWidth: '150px',
    // },
    badgeContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '300px',
        height: '55px',
        position: 'absolute',
        bottom: '2%',
        right: '20px',
    },
    googlePlayContainer: {
        width: '52%',
    },
    TextContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
    }
    // signUpButton: {
    //     backgroundColor: '#c4d82f',
    //     '&:hover': {
    //         backgroundColor: '#8bb535',
    //     },
    //     width: '100%',
    //     height: '100%',
    //     borderRadius: '90px',
    //     textTransform: 'none',
    //     fontSize: '1rem',
    //     fontFamily: 'Colfax-Medium',
    // },
    // linkContainer: {
    //     marginTop: '4vh',
    //     width: '70%',
    // },
}));

export default function Intro(props) {
    const responseGoogle = (response) => {
        postGoogleLogin(response.tokenObj.id_token).then((response) => {
            props.history.push('/product-list');
        })
    };

    const responseFacebook = (response) => {
        postFacebookLogin(response.accessToken).then((response) => {
            props.history.push('/product-list');
        })
    };

    useEffect(() => {
        const jwt = Cookies.get('jwt');
        if (jwt)
            props.history.push('/product-list');
    }, []);

    return (

      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img className="mx-auto h-12 w-auto" alt="PickEat Logo" src={Logo}/>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Connexion à votre compte</h2>
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
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <a href="#" className="font-medium text-green-600 hover:text-green-500">
                    Mot de passe oublié
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Sign in
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
                  <a
                    href="#"
                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span className="sr-only">Connexion avec Facebook</span>
                    <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
                        clipRule="evenodd"
                      />
                    </svg>

                  </a>
                </div>
                <div>
                  <a
                    href="#"
                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span className="sr-only">Connexion avec Google</span>
                    <svg className="w-5 h-5" aria-hidden="true" data-icon="google" viewBox="0 0 488 512">
                      <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"/>
                    </svg>
                    </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )

/*     return (
        <div className={classes.main}>
            <Background/>
            <div className={classes.LeftSection}>
                <Typography component="h1" style={{color:"#282828"}} variant="h5">
                    Luttez contre le gaspillage alimentaire avec Pickeat !
                </Typography>
                <Typography  variant="subtitle1" style={{color:"#9c9c9c"}} gutterBottom component="div">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do <br/>
                    eiusmod tempor incididunt ut labore et dolore magna aliqua.<br/>
                </Typography>

                <img className={classes.illustration} src={`/assets/intro_illustration.png`}/>
            </div>
            <div className={classes.RightSection}>
                <div className={classes.TextContainer}>
                    <Typography  variant="subtitle1" style={{color:"#282828"}} gutterBottom component="div">
                        [SECTION LOGIN]
                    </Typography>

                </div>


                <div className={classes.badgeContainer}>
                    <div className={classes.appStoreContainer}>
                        <a href="https://apps.apple.com/us/app/hill-climb-racing/id564540143?mt=8">
                            <img
                                style={{maxWidth: '100%', maxHeight: '100%'}}
                                alt='Get it on app store'
                                src='https://linkmaker.itunes.apple.com/fr-fr/badge-lrg.svg?releaseDate=2012-11-08&kind=iossoftware&bubble=ios_apps'
                            />
                        </a>
                    </div>
                    <div className={classes.googlePlayContainer}>
                        <a href='https://download-apk.pickeat.fr/'>
                            <img
                                style={{maxWidth: '100%', maxHeight: '100%'}}
                                alt='Get it on Google Play'
                                src='https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png'
                            />
                        </a>
                    </div>
                </div>
            </div>
        </div>
        //     <div className={classes.logoContainer}>
        //         <img width="100%" src={logo} alt={'logo'}/>
        //     </div>
        //     <div className={classes.badgeContainer}>
        //         <div className={classes.appStoreContainer}>
        //             <a href="https://apps.apple.com/us/app/hill-climb-racing/id564540143?mt=8">
        //                 <img
        //                     style={{maxWidth: '100%', maxHeight: '100%'}}
        //                     alt='Get it on app store'
        //                     src='https://linkmaker.itunes.apple.com/fr-fr/badge-lrg.svg?releaseDate=2012-11-08&kind=iossoftware&bubble=ios_apps'
        //                 />
        //             </a>
        //         </div>
        //         <div className={classes.googlePlayContainer}>
        //             <a href='https://download-apk.pickeat.fr/'>
        //                 <img
        //                     style={{maxWidth: '100%', maxHeight: '100%'}}
        //                     alt='Get it on Google Play'
        //                     src='https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png'
        //                 />
        //             </a>
        //         </div>
        //     </div>
        //     <div style={{width: '40%', height: '5%'}}>
        //         <Link to="/sign-up" style={{textDecoration: 'none'}}>
        //             <Button className={classes.signUpButton}>Create an account</Button>
        //         </Link>
        //     </div>
        //
        //     <div style={{width: '400px', height: '5%', margin: 20, display: 'flex', justifyContent: 'space-between'}}>
        //         <GoogleLogin
        //             style={{width: '40%'}}
        //             clientId={process.env.REACT_APP_GOOGLE_LOGIN_CLIENT_ID}
        //             buttonText="Login with Google"
        //             onSuccess={responseGoogle}
        //             onFailure={responseGoogle}
        //             scope={[
        //                 "https://www.googleapis.com/auth/user.emails.read",
        //                 "https://www.googleapis.com/auth/user.phonenumbers.read",
        //                 "https://www.googleapis.com/auth/userinfo.profile",
        //                 "https://www.googleapis.com/auth/userinfo.email",
        //             ].join(" ")}
        //             cookiePolicy={'single_host_origin'}
        //         />
        //         <FacebookLogin
        //             appId={process.env.REACT_APP_FACEBOOK_LOGIN_APP_ID}
        //             fields="name,email,picture"
        //             render={renderProps => (
        //                 <Button variant="outlined" color="primary" onClick={renderProps.onClick}>Login with
        //                     Facebook</Button>
        //             )}
        //             callback={responseFacebook}/>
        //     </div>
        //
        // </div>
    );
    ); */
}
