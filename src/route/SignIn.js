import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Logo from '../assets/logo.png';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import {withStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    main: {
        backgroundImage: "url('/assets/wallpaper-login.jpg')",
        backgroundSize: 'cover',
        height: '100vh',
        paddingTop: '10%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '60%',
        width: '50%',
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
        width: '40%', // Fix IE 11 issue.
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

const PickeatTextField = withStyles({
    root: {
        '& label.Mui-focused': {
            color: 'black',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'green',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'black',
            },
            '&:hover fieldset': {
                borderColor: 'grey',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'green',
            },
        },
    },
})(TextField);

export default function SignIn() {
    const classes = useStyles();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginApiCall = (email, password) => {
        console.log(email, password)
    };

    return (
        <div className={classes.main}>
            <div className={classes.container}>
                <Avatar className={classes.avatar}>
                    <img alt="PickEat Logo" src={Logo}/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <div className={classes.form}>
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
                            loginApiCall(email, password)
                        }}
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                </div>
            </div>
        </div>
    );
}