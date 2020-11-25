import React, { useEffect } from 'react';

import makeStyles from '@material-ui/core/styles/makeStyles';
import logo from '../assets/logo.png';
import FacebookLogin from 'react-facebook-login';

import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';

const responseGoogle = (response) => {
  console.log(response);
}

const responseFacebook = (response) => {
  console.log(response);
}

const componentClicked = (response) => {
  console.log("clicked on the facebook component");
}

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
    height: '50px',
    position: 'absolute',
    top: '10%',
    right: '20px',
  },
  appStoreContainer: {
    width: '135px',
  },
  googlePlayContainer: {
    width: '150px',
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

export default function Intro() {
  const classes = useStyles();

  useEffect(() => {
  }, []);

  return (
    <div className={classes.main}>
      <div className={classes.logoContainer}>
        <img width="100%" src={logo} alt={'logo'}/>
      </div>
      <div className={classes.badgeContainer}>
        <div className={classes.appStoreContainer}>
          <a style={{display: 'flex'}}
             href="https://apps.apple.com/us/app/hill-climb-racing/id564540143?mt=8">
            <img
              alt='Get it on app store'
              src='https://linkmaker.itunes.apple.com/fr-fr/badge-lrg.svg?releaseDate=2012-11-08&kind=iossoftware&bubble=ios_apps'
            />
          </a>
        </div>
        <div className={classes.googlePlayContainer}>
          <a
            style={{ display: 'flex' }}
            href='https://play.google.com/store/apps/details?id=com.fingersoft.hillclimb&hl=en&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'><img
            alt='Get it on Google Play'
            src='https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png'/></a>
        </div>
      </div>
      <div style={{ width: '40%', height: '5%' }}>
        <Link to="/sign-up" style={{ textDecoration: 'none' }}>
          <Button className={classes.signUpButton}>Create an account</Button>
        </Link>
      </div>

      <div style={{ width: '40%', height: '5%', margin: 20, display: 'flex', justifyContent: 'center'}}>
        <GoogleLogin
            style={{width: '40%'}}
            clientId="1093807107395-ekidnpvjb7up07la9jps21qf1mmu6oib.apps.googleusercontent.com"
            buttonText="Login with Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
        />
        <FacebookLogin
            style={{width: '40%'}}
            appId="2779684198966427"
            autoLoad={true}
            fields="name,email,picture"
            onClick={componentClicked}
            callback={responseFacebook} />
      </div>

      <div className={classes.linkContainer}>
        <Link style={{ color: 'black' }} to="sign-in">Already have an account ?</Link>
      </div>
    </div>
  );
}
