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
    const classes = useStyles();

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
}
