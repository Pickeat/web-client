import React, {useEffect, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Logo from '../assets/logo.png';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {useParams} from "react-router-dom";
import confirmDeleteAccountApi from "../api/confirmDeleteAccountApi";

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

export default function DeleteAccount() {
    const classes = useStyles();
    const {token} = useParams();
    const [message, setMessage] = useState('Account has been deleted !');

    useEffect(() => {
        deleteAccountCall(token.slice(7));
    }, []);

    const buildPaper = () => {
        return (
            <>
                <Avatar className={classes.avatar}>
                    <img style={{maxWidth: '100%', maxHeight: '100%'}} alt="PickEat Logo" src={Logo}/>
                </Avatar>
                <Typography component="h1" variant="h5" style={{textAlign: "center"}}>>
                    {message}
                </Typography>
            </>
        )
    }

    const deleteAccountCall = (token) => {
        confirmDeleteAccountApi(token).then((response) => {
            if (!response)
                setMessage("Error during account deletion")
        });
    };

    return (
        <div className={classes.main}>
            <Paper elevation={24} className={classes.container}>
                {buildPaper()}
            </Paper>
        </div>
    );
}
