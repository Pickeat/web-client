import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Logo from '../assets/logo.png';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import {PickeatTextField} from '../components/PickeatTextField';
import Background from '../components/Background';
import backgroundSrc from '../assets/wallpaper-login.jpg';
import signInApi from '../api/signInApi';
import Paper from '@material-ui/core/Paper';
import {Link} from "react-router-dom";
import postGoogleLogin from "../api/postGoogleLogin";
import postFacebookLogin from "../api/postFacebookLogin";
import {GoogleLogin} from "react-google-login";
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

const responseGoogle = (response) => {
    console.log(response.tokenObj.id_token)
    postGoogleLogin(response.tokenObj.id_token)
    this.setState({redirect: "/product-list"});
};

const responseFacebook = (response) => {
    postFacebookLogin(response.accessToken)
};


const useStyles = makeStyles((theme) => ({
    main: {
        paddingTop: '5rem',
        boxSizing: 'border-box',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
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
        marginBottom: '2%'
    },
    form: {
        width: '70%', // Fix IE 11 issue.
        height: "50%",
        display: "flex",
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: "space-evenly",
    },
}));

export default function SignIn(props) {
    const classes = useStyles();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginApiCall = (email, password) => {
        signInApi(email, password).then((response) => {
            props.history.push('/product-list');
        });
    };

    return (
        <div className={classes.main}>
            <Background src={backgroundSrc}/>
            <Paper elevation={24} className={classes.container}>
                <Avatar className={classes.avatar}>
                    <img style={{maxWidth: '100%', maxHeight: '100%'}} alt="PickEat Logo" src={Logo}/>
                </Avatar>
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
                <div style={{margin: '2%'}}>
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
                            <Button variant="outlined" color="primary" onClick={renderProps.onClick}>Login with Facebook</Button>
                        )}
                        callback={responseFacebook}/>
                </div>
            </Paper>
        </div>
    );
}
