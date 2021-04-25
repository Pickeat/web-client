import React, { useEffect } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import logo from '../assets/logo.png';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import postFacebookLogin from "../api/postFacebookLogin";
import postGoogleLogin from "../api/postGoogleLogin";
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

const useStyles = makeStyles(theme => ({
  main: {
    paddingTop: '5rem',
    position: 'relative',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    width: '33%',
    height: '20vh',
    maxWidth: '150px',
  },
  badgeContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '300px',
    height: '55px',
    position: 'absolute',
    top: '10%',
    right: '20px',
  },
  appStoreContainer: {
    width: '45%'
  },
  googlePlayContainer: {
    width: '52%',
  },
  signUpButton: {
    backgroundColor: '#c4d82f',
    '&:hover': {
      backgroundColor: '#8bb535',
    },
    width: '100%',
    height: '100%',
    borderRadius: '90px',
    textTransform: 'none',
    fontSize: '1rem',
    fontFamily: 'Colfax-Medium',
  },
  linkContainer: {
    marginTop: '4vh',
    width: '70%',
  },
}));

export default function Intro(props) {
  const classes = useStyles();

  const responseGoogle = (response) => {
    postGoogleLogin(response.tokenObj.id_token).then ((response) => {
      props.history.push('/product-list');
    })
  };

  const responseFacebook = (response) => {
    postFacebookLogin(response.accessToken).then ((response) => {
      props.history.push('/product-list');
    })
  };

  useEffect(() => {
  }, []);

  return (
    <div className={classes.main}>
      <div className={classes.logoContainer}>
        <img width="100%" src={logo} alt={'logo'}/>
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
      <div style={{ width: '40%', height: '5%' }}>
        <Link to="/sign-up" style={{ textDecoration: 'none' }}>
          <Button className={classes.signUpButton}>Create an account</Button>
        </Link>
      </div>

      <div style={{ width: '40%', height: '5%', margin: 20, display: 'flex', justifyContent: 'center' }}>
        <GoogleLogin
          style={{ width: '40%' }}
          clientId={process.env.REACT_APP_GOOGLE_LOGIN_CLIENT_ID}
          buttonText="Login with Google"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          scope={[
            "https://www.googleapis.com/auth/user.emails.read",
            "https://www.googleapis.com/auth/user.phonenumbers.read",
            "https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/userinfo.email",
          ].join(" ")}
          cookiePolicy={'single_host_origin'}
        />
        <FacebookLogin
            style={{width: '4000px'}}
            appId={process.env.REACT_APP_FACEBOOK_LOGIN_APP_ID}
            fields="name,email,picture"
            render={renderProps => (
                <Button variant="outlined" color="primary" onClick={renderProps.onClick}>Login with Facebook</Button>
            )}
            callback={responseFacebook}/>
      </div>

      <div className={classes.linkContainer}>
        <Link style={{ color: 'black' }} to="sign-in">Already have an account ?</Link>
      </div>
    </div>
  );
}
