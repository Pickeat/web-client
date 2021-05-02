import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Logo from '../assets/logo.png';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import { PickeatTextField } from '../components/PickeatTextField';
import Background from '../components/Background';
import resetPasswordApi from '../api/resetPasswordApi';
import Paper from '@material-ui/core/Paper';
import {useParams} from "react-router-dom";

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

export default function ResetPassword() {
    const classes = useStyles();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState('');
    const [emailSent, setEmailSent] = useState(false);
    const { token } = useParams();

    const buildPaper = () => {
        if (!emailSent) {
            return (
                <>
                    <Avatar className={classes.avatar}>
                        <img style={{ maxWidth: '100%', maxHeight: '100%'}} alt="PickEat Logo" src={Logo}/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Reset Password
                    </Typography>
                    <form className={classes.form}>
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
                            onChange={(event => setPassword(event.target.value))}
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
                            onChange={(event => setConfirmPassword(event.target.value))}
                        />
                        <Button
                            style={{width: '50%'}}
                            type="submit"
                            variant="contained"
                            color="primary"
                            onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                resetPasswordCall(password, confirmPassword, token)
                            }}
                            className="pickeatBtn"
                        >
                            Reset Password
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
                            Password has been reset !
                        </Typography>
                    </>
                )
            }
    }

    const resetPasswordCall = (password, confirmPassword, token) => {
        console.log(password, confirmPassword, token)
        resetPasswordApi(password, confirmPassword, token.slice(7)).then((response) => {
            console.log(response);
            if (!response)
                return
            setEmailSent(true);
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
