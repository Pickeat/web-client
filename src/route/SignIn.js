import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Logo from '../assets/logo.png';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import { PickeatTextField } from '../components/PickeatTextField';
import Background from '../components/Background';
import backgroundSrc from '../assets/wallpaper-login.jpg';
import signInApi from '../api/signInApi';

const useStyles = makeStyles((theme) => ({
    main: {
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
        backgroundColor: 'rgba(255,255,255,0.9)',
        borderRadius: '10px',
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
    submit: {
        backgroundColor: '#c4d82f',
        "&:hover": {
            backgroundColor: '#8bb535',
        }
    },
}));

export default function SignIn() {
    const classes = useStyles();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginApiCall = (email, password) => {
        signInApi(email, password).then((response) => {
            console.log(response);
        });
    };

    return (
        <div className={classes.main}>
            <Background src={backgroundSrc}/>
            <div className={classes.container}>
                <Avatar className={classes.avatar}>
                    <img alt="PickEat Logo" src={Logo}/>
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
                    <PickeatTextField
                        style={{paddingBottom: '8%'}}
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
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                </form>
            </div>
        </div>
    );
}
