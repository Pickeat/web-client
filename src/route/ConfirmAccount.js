import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Logo from '../assets/logo.png';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Background from '../components/Background';
import backgroundSrc from '../assets/wallpaper-login.jpg';
import Paper from '@material-ui/core/Paper';
import {useLocation, BrowserRouter as Router, useParams} from "react-router-dom";

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

export default function ConfirmAccount() {
    const classes = useStyles();
    const { token } = useParams();

    const buildPaper = () => {
        console.log("TOKEN --->" + token);
        confirmAccountCall();
        return (
            <>
                <Avatar className={classes.avatar}>
                    <img style={{ maxWidth: '100%', maxHeight: '100%'}} alt="PickEat Logo" src={Logo}/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Account has been confirmed !
                </Typography>
            </>
        )
    }

    const confirmAccountCall = () => {
        // confirmAccountApi(confirmToken).then((response) => {
        //     console.log(response);
        // });
    };

    return (
        <div className={classes.main}>
            <Background src={backgroundSrc}/>
            <Paper elevation={24} className={classes.container}>
                {buildPaper()}
            </Paper>
        </div>
    );
}
