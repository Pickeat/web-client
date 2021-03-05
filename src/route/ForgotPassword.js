import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Logo from '../assets/logo.png';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import { PickeatTextField } from '../components/PickeatTextField';
import Background from '../components/Background';
import forgotPasswordApi from "../api/forgotPasswordApi";
import Paper from '@material-ui/core/Paper';

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

export default function ForgotPassword() {
    const classes = useStyles();
    const [email, setEmail] = useState("");
    const [emailSent, setEmailSent] = useState(false);


    const buildPaper = () => {
        if (!emailSent) {
            return (
                <>
                    <Avatar className={classes.avatar}>
                        <img style={{ maxWidth: '100%', maxHeight: '100%'}} alt="PickEat Logo" src={Logo}/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Forgot Password
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
                        <Button
                            style={{width: '50%'}}
                            type="submit"
                            variant="contained"
                            color="primary"
                            onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                forgotPasswordCall(email)
                            }}
                            className="pickeatBtn"
                        >
                            Send Email
                        </Button>
                    </form>
                </>
            )
        } else {
            return (
                <>
                    <Avatar className={classes.avatar}>
                        <img style={{ maxWidth: '100%', maxHeight: '100%'}} alt="PickEat Logo" src={Logo}/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Email Sent !
                    </Typography>
                </>
            )
        }
    }

    const forgotPasswordCall = (email) => {
        setEmailSent(true);
        forgotPasswordApi(email).then((response) => {
            console.log(response);
        });
    };

    return (
        <div className={classes.main}>
            <Background/>
            <Paper elevation={24} className={classes.container}>
                {buildPaper()}
            </Paper>
        </div>
    );
}
